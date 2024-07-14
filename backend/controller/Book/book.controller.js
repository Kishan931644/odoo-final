import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import Book from '../../models/book/book.model.js';

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

export { createBook, updateBook, deleteBook, getAllBooks, searchBook };