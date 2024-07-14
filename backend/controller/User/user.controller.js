import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import dbConnect from '../../models/dbconnect.js';

import Book from '../../models/book/book.model.js';
import User from '../../models/user/user.model.js';

dotenv.config();
dbConnect();

// get logged in user details
const getDetail = asyncHandler(async (req, res) => {
    
    try {
        let email = req.user.email;
        const user = await User.findOnce({email},{password: 0});

        if(!user){
            return { status: "error", data: { message: 'User not found' }, hasData: false };
        }

        return { status: "success", data: { message: "user founded", user }, hasData: true };
    } catch (err) {
        return { status: "error", data: { message: 'Internal Server error' }, hasData: false };
    }
});

export {
    getDetail
}