// Ce fichier s'occupe de l'interaction directe avec le fichier JSON des pâtisseries.
// Il fournit des méthodes pour lire, écrire et manipuler les données des pâtisseries.

import fs from 'fs/promises';
import path from 'path';
import { Pastry } from '../../domain/entities/Pastry';
import { loadEnvConfig } from '../../config/env';

const env = loadEnvConfig();

// on récupère le chemin du fichier JSON des pâtisseries
const filePath = path.resolve(__dirname, '../data/', env.DATA_PASTRIES);

export const pastrieRepository = {
    async readPastries(): Promise<Pastry[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Pastry[];
    },

    async writePastries(pastries: Pastry[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');
    }
};