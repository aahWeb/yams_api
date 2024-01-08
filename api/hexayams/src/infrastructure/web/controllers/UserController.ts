// Ce fichier gère les requêtes relatives aux utilisateurs

import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/userRepository';

export const UserController = {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserRepository.readUsers();
            // on ne veut pas renvoyer le mot de passe des utilisateurs dans la réponse
            const usersWithoutPassword = users.map(UserRepository.filterSensitiveInfo);
            res.status(200).json(usersWithoutPassword);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            const user = await UserRepository.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            }
            // on renvoit l'utilisateur sans le mot de passe
            res.json(UserRepository.filterSensitiveInfo(user));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    
    },

    async getMe(req: Request, res: Response) {
        try {
            const user = await UserRepository.getUserById(res.locals.id);
            if (!user)
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            // comme auparavant, on renvoit l'utilisateur sans le mot de passe
            res.json(UserRepository.filterSensitiveInfo(user));
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};