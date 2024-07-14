import { Router } from 'express';
const admin = Router();

admin.get('/dashboard', (req, res) => {
    res.send('Admin Dashboard');
});

admin.get('/getBooks', (req, res) => {
    res.send('Admin Books');
});

admin.get('/getUsers', (req, res) => {
    res.send('Admin Users');
});

admin.get('/getLibrarians', (req, res) => {
    res.send('Admin Librarians');
});

export default admin;