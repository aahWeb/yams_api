import express, { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authentified } from '../../../middlewares/authentified';

const game: Router = express();

// endpoint: /game/win-pastries/:quantity => GET
game.get('/win-pastries/:quantity', authentified, AuthController.logout);

export default game;