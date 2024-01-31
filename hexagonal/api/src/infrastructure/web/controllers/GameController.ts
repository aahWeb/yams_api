import { Request, Response } from 'express';
import { gameService } from '../../../domain/services/gameService';
import  pastriesService  from '../../../domain/services/pastryService';
export const GameController = {
    winPastries(req: Request, res: Response) {
        const quantity = parseInt(req.params.quantity);

        gameService.winPastries(quantity)
            .then(pastriesWin => res.json(pastriesWin))
            .catch(error => {
                const status = error.message === 'La quantité doit être un nombre entier positif.' ? 400 : 500;
                res.status(status).json({ message: error.message });
            });
    },

    async getAllPastries(req: Request, res: Response) {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10; // Valeur par défaut si non spécifié

            const pastries = await pastriesService.getPastriesWithPagination(offset, limit);
            res.status(200).json(pastries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}