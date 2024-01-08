import { Request, Response } from 'express';
import pastriesService from '../../../domain/services/pastriesService';
import { trimAll } from '../../../utils/helpers';

export const PastrieController = {

    // cette fonction est appelée par la route GET /api/pastries
    // elle renvoie toutes les pâtisseries
    async getAllPastries(req: Request, res: Response) {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10; // Valeur par défaut si non spécifié

            const pastries = await pastriesService.getPastriesWithPagination(offset, limit);
            res.status(200).json(pastries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // cette fonction est appelée par la route GET /api/pastries/:id
    // elle renvoie une pâtisserie en fonction de son id
    async getPastrieById(req: Request, res: Response) {
        try {
            const pastrie = await pastriesService.getPastrieById(req.params.id);
            if (!pastrie) {
                return res.status(404).json({ message: 'Pâtisserie non trouvée !' });
            }
            res.json(pastrie);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // cette fonction est appelée par la route GET /api/pastries/count
    // elle renvoie le nombre de pâtisseries
    async getPastriesCount(req: Request, res: Response) {
        try {
            const count = await pastriesService.getPastriesCount();
            res.json({ count });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // cette fonction est appelée par la route GET /api/pastries/search/:word
    // elle renvoie une pâtisserie en fonction d'un mot
    async searchPastrie(req: Request, res: Response) {
        try {
            const word = req.params.word;
            const pastrie = await pastriesService.searchPastrie(word);
            if (!pastrie) {
                return res.status(404).json({ message: 'Pâtisserie non trouvée !' });
            }
            res.json(pastrie);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async searchPastrieByWord(req: Request, res: Response) {
        try {
            const word = req.params.word;
            const pastries = await pastriesService.searchPastrieByWord(word);
            res.json(pastries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // cette fonction est appelée par la route GET /api/pastries/offset/:offset/limit/:limit
    // elle renvoie des pâtisseries en fonction d'un offset et d'un limit
    async getPastriesWithPagination(req: Request, res: Response) {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const pastries = await pastriesService.getPastriesWithPagination(offset, limit);
            res.json(pastries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },


    // cette fonction est appelée par la route GET /api/pastries/order/offset/:offset/limit/:limit
    // elle renvoie des pâtisseries en fonction d'un offset et d'un limit avec un ordre
    async getPastriesByQuantity(req: Request, res: Response) {
        try {
            const { offset, limit } = req.params;
            const pastries = await pastriesService.getPastriesByQuantity(parseInt(offset), parseInt(limit));
            res.json(pastries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },


    // cette fonction est appelée par la route POST /api/pastries
    // elle ajoute une pâtisserie
    async addPastrie(req: Request, res: Response) {
        try {
            const { name, quantity, image, choice } = trimAll(req.body);
            if (!name || !quantity) {
                throw new Error('Données invalides !');
            }
            const newPastrie = await pastriesService.addPastrie({ name, quantity, image, choice });
            res.json(newPastrie);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },


    // cette fonction est appelée par la route PUT /api/pastries/:id
    // elle modifie une pâtisserie
    async updatePastrie(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updateData = trimAll(req.body);
            const updatedPastrie = await pastriesService.updatePastrie(id, updateData);
            if (!updatedPastrie) {
                return res.status(404).json({ message: 'Pâtisserie non trouvée !' });
            }
            res.json(updatedPastrie);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // cette fonction est appelée par la route DELETE /api/pastries/:id
    // elle supprime une pâtisserie
    async deletePastrie(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await pastriesService.deletePastrie(id);
            res.status(200).json({ message: 'Pâtisserie supprimée avec succès.' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};