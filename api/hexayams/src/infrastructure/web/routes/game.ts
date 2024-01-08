import express, { Router } from 'express';
import { GameController } from '../controllers/GameController';
import { authentified } from '../../../middlewares/authentified';

const game: Router = express();

// endpoint: /game/win-pastries/:quantity => GET
game.get('/win-pastries/:quantity', authentified, GameController.winPastries);

export default game;