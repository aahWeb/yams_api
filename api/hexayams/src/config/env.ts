import { EnvConfig } from "../types/envConfig";

// on exporte une fonction qui charge les variables d'environnement avec des types corrects
// pour éviter les erreurs de types et la répétition du process.env partout

export function loadEnvConfig(): EnvConfig {
    return {
        PORT: parseInt(process.env.PORT || '3001'),
        APP_URL: process.env.APP_URL || 'localhost',
        DATA_PASTRIES: process.env.DATA_PASTRIES || 'pastries.json',
        DATA_USERS: process.env.DATA_USERS || 'users.json',
        APP_ORIGIN: process.env.APP_ORIGIN || 'http://localhost:5173',
        SECRET: process.env.SECRET || 'SecretANePasPartager'
    };
}