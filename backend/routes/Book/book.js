import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';

import { getAllBooks, searchBook , borrowBook} from '../../controller/Book/book.controller.js';

const book = Router();

book.get("/get-all-books", getAllBooks);
book.get("/search-book", searchBook);
book.get("/borrow-book/:ISBN", validateUser, borrowBook);

export default book;