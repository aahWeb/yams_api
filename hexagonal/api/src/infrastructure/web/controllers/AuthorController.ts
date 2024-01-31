import { Request, Response } from 'express';
import { AuthService } from '../../../domain/services/authService';
import { trimAll } from '../../../utils/helpers';

export const AuthController = {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = trimAll(req.body);
            const {user, token } = await AuthService.login({email, password});
            if (!user)
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });

            res.cookie('token', token, { httpOnly: true, secure: false });
            
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = trimAll(req.body);
            const user = await AuthService.register({name, email, password});
            if (!user)
                return res.status(404).json({ message: 'Utilisateur non trouvé !' });
            res.json({ message: 'Utilisateur créé !' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    async logout(req: Request, res: Response) {
        try {
            AuthService.logout(req, res);
            res.json({ message: 'Déconnecté !' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};