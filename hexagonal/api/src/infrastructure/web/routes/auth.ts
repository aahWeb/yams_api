import express, { Router } from 'express';
import { AuthController } from '../controllers/AuthorController';
import { authentified } from '../../../middlewares/authentified';

const auth: Router = express();

// endpoint: /auth/login => POST
auth.post('/login', AuthController.login);

// endpoint: /auth/register => POST
auth.post('/register', AuthController.register);

// endpoint: /auth/logout => GET
auth.get('/logout', authentified, AuthController.logout);

export default auth;