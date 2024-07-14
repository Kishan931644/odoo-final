import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import generateUUID from '../../utils/generateUUID.js';

import dbConnect from '../../models/dbconnect.js';
// import User from "../models/Users/user.model.js";

dotenv.config();
dbConnect();

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = { username, password, email };

    let result = await createUser(user);
    if (result.status === "error") {
        return res.status(400).json(result);
    }

    return res.status(201).json({ status: "success", data: { message: 'User registered successfully', }, hasData: true });
});

// Validate token
const tokenValidate = asyncHandler(async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: "error", data: { message: 'Access denied' }, hasData: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['RS256'] });
        return res.status(200).json({ status: "success", data: { message: 'Token is valid' }, hasData: false });
    } catch (e) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid token' }, hasData: false });
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ status: "error", data: { message: 'No user founded with this credentials' }, hasData: false });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (!isPasswordSame) {
            console.log(`Invalid password for user: ${username}`);
            return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
        }

        const token = generateJWTToken(user);
        return res.json({ status: "success", data: { message: 'Login successful', token: token }, hasData: true });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: "error", data: { message: 'Internal server error' }, hasData: false });
    }
});

// Logout user
const logout = asyncHandler(async (req, res) => {
    // Invalidate token logic here (if using token blacklist)


    return res.status(200).json({ status: "success", data: { message: 'Logged out successfully' }, hasData: false });
});

export { register, login, logout, tokenValidate };