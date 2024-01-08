import { Request, Response } from 'express';
import { gameService } from '../../../domain/services/gameService';

export const GameController = {
    winPastries(req: Request, res: Response) {
        const quantity = parseInt(req.params.quantity);

        gameService.winPastries(quantity)
            .then(pastriesWin => res.json(pastriesWin))
            .catch(error => {
                const status = error.message === 'La quantité doit être un nombre entier positif.' ? 400 : 500;
                res.status(status).json({ message: error.message });
            });
    }
}