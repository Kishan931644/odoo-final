import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import {
    createBook,
    updateBook,
    deleteBook
} from '../../controller/Book/book.controller.js';

import User from '../../models/user/user.model.js';

dotenv.config();
dbConnect();

// add book to the system 
const add_Book = asyncHandler(async (req, res) => {

    if (req.user.role !== "librarian") {
        return res.status(401).json({ status: "error", data: { message: 'Access denied! you are not allowed to add book' }, hasData: false });
    }
    const book = req.body;

    let result = await createBook(book);

    if (result.status === "error") {
        return res.status(400).json(result);
    }

    return res.status(201).json({ status: "success", data: { message: 'Book added successfully', }, hasData: true });

});

// update book details without ISBN
const update_Book = asyncHandler(async (req, res) => {
    if (req.user.role !== "librarian") {
        return res.status(401).json({ status: "error", data: { message: 'Access denied! you are not allowed to add book' }, hasData: false });
    }
    try {
        const book = req.body;

        let result = await createBook(book);

        return { status: "success", data: { message: 'Book updated successfully', }, hasData: true };
    } catch (err) {
        return { status: "error", data: { message: 'Internal Server error' }, hasData: false };
    }

});

// delete book by ISBN
const delete_Book = asyncHandler(async (req, res) => {
    if (req.user.role !== "librarian") {
        return res.status(401).json({ status: "error", data: { message: 'Access denied! you are not allowed to add book' }, hasData: false });
    }
    try {
        let result = await deleteBook(req.params.isbn);
        return res.status(200).json({ status: "success", data: { message: 'Book deleted successfully', }, hasData: true });
    } catch (err) {
        return res.status(500).json({ status: "error", data: { message: 'Internal Server error' }, hasData: false });
    }
});

// get all librarian
const getLibrarians = asyncHandler(async (req, res) => {
    if (req.user.role != "admin") {
        return res.status(401).json({ status: "error", data: { message: 'Access denied! you are not allowed to add book' }, hasData: false });
    }
    try {
        let result = await User.find({ role: "librarian"}, { password: 0 });
        return res.status(200).json({ status: "success", data: result, hasData: true });
    } catch (err) {
        return res.status(500).json({ status: "error", data: { message: 'Internal Server error' }, hasData: false });
    }
});

export {
    add_Book,
    update_Book,
    delete_Book,
    getLibrarians
};
