import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import generateUUID from '../../utils/generateUUID.js';

import dbConnect from '../../models/dbconnect.js';
import User from "../../models/user/user.model.js";

dotenv.config();
dbConnect();

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { name, address, city, country, phone, password, email } = req.body;

    const user = { name, address, city, country, phone, password, email,role: "user" };

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User not found with is email: ${email}`);
            return res.status(401).json({ status: "error", data: { message: 'No user founded with this credentials' }, hasData: false });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (!isPasswordSame) {
            console.log(`Invalid password for user with this email: ${email}`);
            return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
        }

        const isAdmin = user.role == 'admin';

        console.log(user);

        const token = generateJWTToken(user);
        return res.json({ status: "success", data: { message: 'Login successful', role: user.role,  isAdmin: isAdmin, token: token }, hasData: true });

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

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ status: "success", data: { message: "Password changed successfully" }, hasData: false });
});

const deleteAccount = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    await user.remove();

    return res.json({ status: "success", data: { message: "Account deleted successfully" }, hasData: false });
});

const generateJWTToken = (user) => {
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role, id: user.userid }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
};

const invalidateToken = (token) => {
    // Logic to invalidate token

};

const createUser = async ({ name, address, city, country, phone, role, password, email }) => {
    let userid = generateUUID();
    let isUnique = false;

    do {
        let isUserIDUnique = await User.findOne({ userid });
        if (!isUserIDUnique) {
            isUnique = true;
        } else {
            userid = generateUUID();
        }

    } while (isUnique != true);

    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        return { status: "error", data: { message: 'Email already exists' }, hasData: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ userid, name, email, address, city, phone, country, password: hashedPassword, role, email });
    return user.save();
}


export { 
    register, 
    login, 
    logout, 
    tokenValidate,
    changePassword,
    deleteAccount,
    createUser
};