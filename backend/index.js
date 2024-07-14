import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import validateUser from './middleware/validateUser.js';
import Auth from './routes/Auth/auth.js';
import user from './routes/User/user.js';
import admin from './routes/Admin/admin.js';
import librarian from './routes/Librarian/librarian.js';
import book from './routes/Book/book.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', Auth);
app.use('/api/book', validateUser, book);
app.use('/api/user', validateUser, user);
app.use('/api/admin', validateUser, admin);
app.use('/api/librarian', validateUser, librarian);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});