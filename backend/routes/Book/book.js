import { Router } from 'express';

import { getAllBooks, searchBook } from '../../controller/Book/book.controller.js';

const book = Router();

book.get("/get-all-books", getAllBooks);
book.get("/search-book?q=", searchBook);

export default book;