import express, { Router, Request, Response } from "express"
import fs from 'fs/promises';
import path from "path";
import { Pastrie } from "./../pastrie";

import dotenv from 'dotenv';
dotenv.config();

const DATA_PASTRIES = process.env.DATA_PASTRIES || "pastries.json";
const filePath = path.resolve(__dirname, '../Data', DATA_PASTRIES);

const router: Router = express.Router();

router.get('/pastries', async (req: Request, res: Response) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries : Pastrie[]  = JSON.parse(data) 

        return res.status(200).json(pastries);
    } catch (error: any) {

        res.status(400).send('Le fichier demandé n\'existe pas.');
    }
});

router.get('/pastrie/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries : Pastrie[]  = JSON.parse(data) 
        const pastrie: Pastrie | undefined = pastries.find(p => p.id == id)

        if (pastrie) {
            pastrie.choice = true 
           
            await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

            return res.json(pastrie);
        } else {
            return res.status(404).json({
                message: 'Pâtisserie non trouvée !'
            });
        }

    } catch (error: any) {

        res.status(400).send('Le fichier demandé n\'existe pas.');
    }
});

export default router;