import { Router } from 'express';
const book = Router();

book.get('/getBooks', (req, res) => {
    res.send('Books');
});

book.get('/getBook/:id', (req, res) => {
    res.send('Book');
});

book.post("availability/:isbn", (req, res) => {
    res.send("Availability");
});

book.post('/deleteBook/:isbn', (req, res) => {
    res.send('Delete Book');
});

export default book;