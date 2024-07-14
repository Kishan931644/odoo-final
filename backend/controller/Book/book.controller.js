import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import User from '../../models/user/user.model.js';
import Book from '../../models/book/book.model.js';
import BorrowingRecord from '../../models/book/borrow.model.js';
// import saveNotification from '../notification/saveNotification.js';

dotenv.config();
dbConnect();

// borrow book
const borrowBook = asyncHandler(async (req, res) => {
    const ISBN = req.params.ISBN;
    const user = await User.findOne({ email: req.user.email });
    const book = await Book.findOne({ ISBN: ISBN });

    if (!user) {
        return res.status(404).json({ status: "error", data: { message: "No user found" }, hasData: false });
    }
    if (!book) {
        return res.status(404).json({ status: "error", data: { message: "No book found" }, hasData: false });
    }
    if (book.quantity < 1) {
        return res.status(400).json({ status: "error", data: { message: "Book not available" }, hasData: false });
    }

    // Calculate due date (e.g., 14 days from now)
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 14);

    // Create a borrow record
    const borrowRecord = await BorrowingRecord.create({
        user: user._id,
        book: book._id,
        borrowDate: borrowDate,
        dueDate: dueDate,
        returned: false
    });

    // Update book quantity
    book.quantity -= 1;
    await book.save();
  
    const notificationData = {
      user: user.email,
      message: `You have successfully borrowed the book titled "${book.title}". Please return it by ${borrow.expectedReturnDate.toDateString()}.`
  };
  await saveNotification(notificationData);
  
    res.status(200).json({ status: "success", data: { message: "Book borrowed successfully", borrowRecord }, hasData: true });
});

// return book
const returnBook = asyncHandler(async (req, res) => {
    const ISBN = req.params.ISBN;
    const user = await User.findOne({ email: req.user.email });
    const book = await Book.findOne({ ISBN: ISBN });

    if (!user) {
        return res.status(404).json({ status: "error", data: { message: "No user found" }, hasData: false });
    }
    if (!book) {
        return res.status(404).json({ status: "error", data: { message: "No book found" }, hasData: false });
    }

    const borrowRecord = await BorrowingRecord.findOne({ user: user._id, book: book._id });

    if (!borrowRecord) {
        return res.status(400).json({ status: "error", data: { message: "This book was not borrowed by the user or has already been returned" }, hasData: false });
    }

    // Calculate late fees
    const currentDate = new Date();
    const dueDate = new Date(borrowRecord.dueDate);
    let lateFee = 0;

    if (currentDate > dueDate) {
        const daysLate = Math.ceil((currentDate - dueDate) / (1000 * 60 * 60 * 24));
        lateFee = daysLate * 2;
    }

    // Mark borrow record as returned
    borrowRecord.returned = true;
    borrowRecord.returnedDate = currentDate;
    borrowRecord.lateFee = lateFee;
    await borrowRecord.save();

    // Update book quantity
    book.quantity += 1;
    await book.save();

    res.status(200).json({ status: "success", data: { message: "Book returned successfully", borrowRecord, lateFee }, hasData: true });
});

// create book
const createBook = (async (data) => {

    try {
        console.log(data);
        let book1 = await Book.findOne({ ISBN: data.ISBN });

        if (book1) {

            book1.desc = data.desc;

            book1.quantity += data.quantity;
            await book1.save();

            return { status: "success", data: { message: 'Book with same ISBN was already there so it increased the quantity of the book', }, hasData: false };
        }
        const { title, author, desc, genre, publisher, year, isbn, quantity, price, thumbnailLink } = data;

        const book = { title, author, desc, genre, publisher, year, ISBN: isbn, quantity, price, thumbnailLink };

        let result = await Book(book);
        result.save();


        return { status: "success", data: { message: 'Book added successfully', }, hasData: true };
    } catch (err) {
        console.log(err);
        return { status: "error", data: { message: 'Internal Server error' }, hasData: false };

    }

});

// update book details without ISBN
const updateBook = (async (data) => {

    try {

        const book = data;

        let result = await Book.findOneAndUpdate({ ISBN: isbn }, book);
        result.save();

        return { status: "success", data: { message: 'Book updated successfully', }, hasData: true };
    } catch (err) {

        return { status: "error", data: { message: 'Internal Server error' }, hasData: false };

    }

});

// delete book by ISBN
const deleteBook = (async (isbn) => {

    try {

        let result = await Book.findOneAndDelete({ ISBN: isbn });
        result.save();

        return { status: "success", data: { message: 'Book deleted successfully', }, hasData: true };
    } catch (err) {
        return { status: "error", data: { message: 'Internal Server error' }, hasData: false };
    }
});

// get all books in the system
const getAllBooks = asyncHandler(async (req, res) => {

    const books = await Book.find();

    if (!books) {
        return res.status(200).json({ status: "error", data: { message: "No books found" }, hasData: false });
    }

    return res.status(200).json({ status: "success", data: { message: "Books founded", books }, hasData: true });


});

// search book by title, author, genre, publisher, ISBN, thumbnailLink, year, quantity, price
const searchBook = asyncHandler(async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ status: "error", data: { message: "Query parameter 'q' is required" }, hasData: false });
    }

    let searchCriteria = [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
        { publisher: { $regex: query, $options: 'i' } },
        { ISBN: { $regex: query, $options: 'i' } },
        { thumbnailLink: { $regex: query, $options: 'i' } }
    ];

    // Check if the query can be converted to a number
    if (!isNaN(query)) {
        searchCriteria.push(
            { year: Number(query) },
            { quantity: Number(query) },
            { price: Number(query) }
        );
    }

    const books = await Book.find({ $or: searchCriteria });

    if (!books || books.length === 0) {
        return res.status(200).json({ status: "error", data: { message: "No books found" }, hasData: false });
    }

    return res.status(200).json({ status: "success", data: { message: "Books found", books }, hasData: true });
});

// get book by ISBN number
const getBookByISBN = asyncHandler(async (req, res) => {
    const isbn = req.params.ISBN;

    const book = await Book.findOne({ ISBN: isbn });

    if (!book) {
        return res.status(200).json({ status: "error", data: { message: "Book not found" }, hasData: false });
    }

    return res.status(200).json({ status: "success", data: { message: "Book found", book }, hasData: true });
});

const getUserHistoryRecommendations = (async (req, res) => {
    const borrowedBooks = await BorrowingRecord.find({ user: req.user.mainid }).populate('book');
    console.log(borrowedBooks);
    if (!borrowedBooks.length) {
        let books = await Book.find().limit(10);
        return res.status(200).json({ status: "error", data: { message: "no book found for recommandation", books }, hasData: true });
    }

    // Extract genres and authors from the user's borrowed books
    const genres = borrowedBooks.map(entry => entry.book.genre);
    const authors = borrowedBooks.map(entry => entry.book.author);
    const borrowedBookIds = borrowedBooks.map(entry => entry.book._id);

    // Find books that match the genres and authors, excluding already borrowed books
    const recommendations = await Book.find({
        $or: [
            { genre: { $in: genres } },
            { author: { $in: authors } }
        ],
        _id: { $nin: borrowedBookIds }
    }).limit(10);

    return res.status(200).json({ status: "success", data: { message: "we founded the recommanded books found", books: recommendations }, hasData: true });
});

const getPopuplarBooks = asyncHandler(async (req, res) => {
    const popularBooks = await Book.find().sort({ borrowedCount: -1 }).limit(10);

    if (!popularBooks) {
        return res.status(200).json({ status: "error", data: { message: "No popular books found" }, hasData: false });
    }

    return res.status(200).json({ status: "success", data: { message: "Popular books found", popularBooks }, hasData: true });
});





export { createBook, updateBook, deleteBook, getAllBooks, searchBook, getBookByISBN, getUserHistoryRecommendations, getPopuplarBooks, borrowBook, returnBook };
