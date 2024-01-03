import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();
const DATA_PASTRIES = process.env.DATA_PASTRIES || "pastries.json";

interface CustomRequest extends Request {
    locals: {
        data?: any; // Ajoutez d'autres propriétés au besoin
    };
}

// Middleware pour lire les données du fichier et les rendre disponibles dans les routes suivantes
export const readDataMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const filePath = path.resolve(__dirname, '../Data', DATA_PASTRIES);

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        req.locals = { data: JSON.parse(data) };
        next();
    } catch (error: any) {
        console.error('Erreur lors de la lecture du fichier :', error);

        // Si le fichier n'est pas trouvé, renvoyez une réponse 400
        if (error.code === 'ENOENT') {
            res.status(400).send('Le fichier demandé n\'existe pas.');
        } else {
            // Sinon, renvoyez une réponse 500 pour les autres erreurs
            res.status(500).send('Erreur interne du serveur.');
        }
    }
};
