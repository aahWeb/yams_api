import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import router from "./infrastructure/web/routes/index";
import { loadEnvConfig } from './config/env';
import path from 'path';

const env = loadEnvConfig();

const PORT: number = env.PORT;
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors({
  origin: env.APP_ORIGIN,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(router);
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Listening http://${env.APP_URL}:${PORT}`);
});