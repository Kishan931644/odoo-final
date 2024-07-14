import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import Book from '../../models/book/book.model.js';
import BorrowingRecord from '../../models/book/borrow.model.js';

dotenv.config();
dbConnect();

// create book
const createBook = (async (data) => {

    try {

        const { title, author, genre, publisher, year, isbn, quantity, price, thumbnailLink } = data;

        const book = { title, author, genre, publisher, year, ISBN: isbn, quantity, price, thumbnailLink };

        let result = await Book(book);
        result.save();


        return { status: "success", data: { message: 'Book added successfully', }, hasData: true };
    } catch (err) {

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
    console.log(req.user);
    if (!borrowedBooks.length) {
        let books = await Book.find().limit(10);
        return res.status(200).json({ status: "error", data: {message:"no book found for recommandation", books}, hasData: true });
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

    return recommendations;
});

const getPopuplarBooks = asyncHandler(async (req,res) => {
    const popularBooks = await Book.find().sort({ borrowedCount: -1 }).limit(10);
    
    if(!popularBooks){
        return { status: "error", data: { message: "No popular books found" }, hasData: false };
    }

    return { status: "success", data: { message: "Popular books found", popularBooks }, hasData: true };
});
  


export { createBook, updateBook, deleteBook, getAllBooks, searchBook, getBookByISBN, getUserHistoryRecommendations, getPopuplarBooks };