// le type EnvConfig sert à typer les variables d'environnement

export type EnvConfig = {
    PORT: number;
    APP_URL: string;
    DATA_PASTRIES: string;
    DATA_USERS: string;
    APP_ORIGIN: string;
    SECRET: string;
};