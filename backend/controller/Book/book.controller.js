import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import Book from '../../models/book/book.model.js';
import User from '../../models/user/user.model.js'
import BorrowBook from '../../models/book/borrow.model.js';

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
    const borrowRecord = await BorrowBook.create({
      user: user._id,
      book: book._id,
      borrowDate: borrowDate,
      dueDate: dueDate,
      returned: false
    });
  
    // Update book quantity
    book.quantity -= 1;
    await book.save();
  
    res.status(200).json({ status: "success", data: { message: "Book borrowed successfully", borrowRecord }, hasData: true });
  });


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

const getAllBooks = asyncHandler(async (req,res)=>{
    
    const books = await Book.find();

    if(!books){
        return res.status(200).json({status: "error", data:{message:"No books found"},hasData: false});
    }

    return res.status(200).json({status: "success", data: {message: "Books founded", books}, hasData: true});


});

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

export { createBook, updateBook, deleteBook, getAllBooks, searchBook , borrowBook};