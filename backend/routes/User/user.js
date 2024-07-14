import { Router } from 'express';
const user = Router();

user.get('/profile', (req, res) => {
    res.send('User Profile');
});

user.get('/getborrowedBooks', (req, res) => {
    res.send('User Books');
});

user.post('/borrowBook/:isbn', (req, res) => {
    res.send('Borrow Book');
});

user.post('/returnBook/:isbn', (req, res) => {
    res.send('Return Book');
});




export default user;