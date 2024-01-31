import express, { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authentified } from '../../../middlewares/authentified';

const user: Router = express();

// endpoint: /users => GET
user.get('/', UserController.getUsers);

// endpoint: /users/me => GET
user.get('/me', authentified, UserController.getMe);

// endpoint: /users/:id => GET
user.get('/:id', authentified, UserController.getUser);

export default user;