import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';
const Auth = Router();

import {
    register,
    login,
    googleData,
    googleLogin,
    googleLoginCallback,
    logout,
    tokenValidate
} from '../../controller/Auth/auth.controller.js';


Auth.post('/register', register);
Auth.post('/login', login);
Auth.get('/google', googleLogin);
Auth.get('/googleData', googleData);
Auth.get('/googleLogin', googleLoginCallback);
Auth.post('/logout', logout);
Auth.get('/tokenValidate', validateUser, tokenValidate);



export default Auth;