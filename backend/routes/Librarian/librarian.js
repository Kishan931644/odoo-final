import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';
const librarian = Router();


import {
    add_Book,
    update_Book,
    delete_Book,
    getLibrarians
} from '../../controller/Librarian/librarian.controller.js';


librarian.post('/add-book', validateUser ,add_Book);
librarian.post('/update-book', validateUser ,update_Book);
librarian.post('/delete-book/:isbn', validateUser ,delete_Book);
librarian.get('/get-librarians', validateUser ,getLibrarians);


export default librarian;