import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';
import { getAllBooks, searchBook, getBookByISBN, getUserHistoryRecommendations, getPopuplarBooks, borrowBook, returnBook } from '../../controller/Book/book.controller.js';

const book = Router();

book.get("/get-all-books", getAllBooks);
book.get("/search-book", searchBook);
book.get("/getrecommodadedbooks", validateUser, getUserHistoryRecommendations);
book.get("/getpopularbooks", validateUser, getPopuplarBooks);
book.get("/:ISBN", validateUser, getBookByISBN);

book.get("/borrow-book/:ISBN", validateUser, borrowBook);
book.get('/return-book/:ISBN', validateUser, returnBook);

export default book;