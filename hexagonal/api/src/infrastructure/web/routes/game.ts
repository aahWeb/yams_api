import express, { Router } from 'express';
import { GameController } from '../controllers/GameController';

const game: Router = express();

// endpoint: /game/win-pastries/:quantity => GET
game.get('/win-pastries/:quantity',  GameController.winPastries);
game.get('/pastries', GameController.getAllPastries);

// pastry id pastries refresh

export default game;