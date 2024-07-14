import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';
import User from '../../models/user/user.model.js';
import { getAllBooks, searchBook, getBookByISBN, getUserHistoryRecommendations, getPopuplarBooks, borrowBook, returnBook } from '../../controller/Book/book.controller.js';

const book = Router();

book.get("/get-all-books", getAllBooks);
book.get("/search-book", searchBook);
book.get("/getrecommodadedbooks", validateUser, getUserHistoryRecommendations);
book.get("/getpopularbooks", validateUser, getPopuplarBooks);
book.get("/get-all-users", validateUser, async(req,res)=>{
    const users = await User.find({role: "user"},{password: 0});

    if(!users){
        return res.status(200).json({ status: "error", data: { message: "No users found" }, hasData: false });
    }

    return res.status(200).json({ status: "success", data: { message: "Users found", users }, hasData: true });
});
book.get("/:ISBN", validateUser, getBookByISBN);

book.get("/borrow-book/:ISBN", validateUser, borrowBook);
book.get('/return-book/:ISBN', validateUser, returnBook);




export default book;