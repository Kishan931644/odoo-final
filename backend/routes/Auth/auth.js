import { Router } from 'express';
import validateUser from '../../middleware/validateUser.js';
const Auth = Router();

import {
    register,
    login,
    logout,
    tokenValidate
} from '../../controller/Auth/auth.controller.js';


Auth.post('/register', register);
Auth.post('/login', login);
Auth.post('/logout', logout);
Auth.get('/tokenValidate', validateUser, tokenValidate);



export default Auth;