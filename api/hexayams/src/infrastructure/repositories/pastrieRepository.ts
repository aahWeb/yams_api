// Ce fichier s'occupe de l'interaction directe avec le fichier JSON des pâtisseries.
// Il fournit des méthodes pour lire, écrire et manipuler les données des pâtisseries.

import fs from 'fs/promises';
import path from 'path';
import { Pastrie } from '../../domain/entities/Pastrie';
import { loadEnvConfig } from '../../config/env';

const env = loadEnvConfig();

// on récupère le chemin du fichier JSON des pâtisseries
const filePath = path.resolve(__dirname, '../data/', env.DATA_PASTRIES);

export const pastrieRepository = {
    async readPastries(): Promise<Pastrie[]> {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Pastrie[];
    },

    async writePastries(pastries: Pastrie[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');
    }
};
