import { Router } from 'express';
const librarian = Router();

librarian.get('/profile', (req, res) => {
    res.send('Librarian Profile');
});

librarian.post('/addBook', (req, res) => {
    res.send('Add Book');
});

librarian.post("deleteBook/:isbn", (req, res) => {
    res.send("Delete Book");
});

librarian.post('/updateBook/:isbn', (req, res) => {
    res.send('Update Book');
});

librarian.get("acceptReturnRequest/:isbn", (req, res) => {
    res.send("Accept Return Request");
});


export default librarian;