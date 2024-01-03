import express, { Router, Request, Response } from "express";
import { Pastrie } from "./../pastrie";
import { authentified } from "../middleware";
import { trimAll } from "../utils/helpers";
import fs from 'fs/promises';
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const DATA_PASTRIES = process.env.DATA_PASTRIES || "pastries.json";
const filePath = path.resolve(__dirname, '../Data', DATA_PASTRIES);

const router: Router = express.Router();

// optimisation dans le comptage des pastries 
const pastries: Pastrie[] = [];

// all pastries
router.get("/pastries", authentified, async (req: Request, res: Response) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries: Pastrie[] = JSON.parse(data)

        return res.status(200).json(pastries);
    } catch (error: any) {

        res.status(400).send('Le fichier demandé n\'existe pas.');
    }
});

// id pastries
router.get("/pastrie/:id", authentified, async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries: Pastrie[] = JSON.parse(data)
        const pastrie: Pastrie | undefined = pastries.find(p => p.id == id)

        if (pastrie) {

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

router.get("/pastries-search/:word", authentified, async (req: Request, res: Response) => {
    try {
        const word: string = req.params.word;
        const re = new RegExp(word.trim(), 'i');

        const data = await fs.readFile(filePath, 'utf-8');
        const pastries: Pastrie[] = JSON.parse(data)
        const pastrie: Pastrie | undefined = pastries.find(p => p.name.match(re))

        if (pastrie) {

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

/**
 * Exemple de récupération des données avec start et end dans l'url 
 * Dans l'exemple ci-dessous on récupère deux pastries 
 * api/pastries/0/2
 */
router.get("/pastries/:offset?/:limit", async (req: Request, res: Response) =>{
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);
    const data = await fs.readFile(filePath, 'utf-8');
    const pastries : Pastrie[]  = JSON.parse(data) 

    // on commence à offsetr et on prends limit elements
    const p: Pastrie[] = limit ? pastries.slice(offset).slice(0, limit) : pastries.slice(offset)
    return res.json(p);
});

// même requete mais ordonné
router.get("/pastries/order-quantity/:offset?/:limit", authentified, async  (req: Request, res: Response) => {
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);
    const data = await fs.readFile(filePath, 'utf-8');
    const pastries : Pastrie[]  = JSON.parse(data);

    // by quantity order 
    pastries.sort((a, b) => b.quantity - a.quantity)

    // on commence à offsetr et on prends limit elements
    const p: Pastrie[] = limit ? pastries.slice(offset).slice(0, limit) : pastries.slice(offset)
    return res.json(p);
});

// count number pastries 
router.get("/pastries-count", authentified, async (req: Request, res: Response)  =>{
    const data = await fs.readFile(filePath, 'utf-8');
    const pastries : Pastrie[]  = JSON.parse(data);

    return res.json(pastries.length);
});

// ajouter une pâtisserie dans le mock
router.post("/pastrie", authentified, async (req: Request, res: Response) =>{
    try {
        const { name, quantity, image, choice } = trimAll(req.body);
        const p: Pastrie = { name, quantity, image, choice };
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries : Pastrie[]  = JSON.parse(data);

        // on vérifie les champs obligatoires
        if (!p.name || !p.quantity) {
            return res.status(400).json({
                message: 'Données invalides !'
            });
        }

        // on récupère le dernier id et on incrémente
        const lastId: string = pastries[pastries.length - 1]?.id || "0";
        p.id = (parseInt(lastId) + 1).toString();

        pastries.push(p);
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

        return res.json(p);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// modifier une pâtisserie dans le mock
router.put("/pastrie/:id", authentified, async (req: Request, res: Response) =>{
    try {
        const id: string = req.params.id;
        const { name, quantity, image, choice } = trimAll(req.body);
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries : Pastrie[]  = JSON.parse(data);
        const p: Pastrie | undefined = pastries.find(p => p.id == id);

        // on vérifie que la pâtisserie existe
        if (!p) {
            return res.status(404).json({
                message: 'Pâtisserie non trouvée !'
            });
        }

        // on assigne les nouvelles valeurs à la pâtisserie
        p.name = name;
        p.quantity = quantity;
        p.image = image;
        p.choice = choice;
        await fs.writeFile(filePath, JSON.stringify(pastries), 'utf-8');

        return res.json(p);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// DELETE API
router.delete("/pastrie/:id", async (req: Request, res: Response) =>{
    try {
        const id: string = req.params.id;
        const data = await fs.readFile(filePath, 'utf-8');
        const pastries : Pastrie[]  = JSON.parse(data);
        const lenPastries = pastries.length
        const p: Pastrie[] | undefined = pastries.filter(p => p.id != id);

        // on vérifie que la pâtisserie existe
        if (lenPastries == p.length) {
            return res.status(404).json({
                message: 'Pâtisserie non trouvée !'
            });
        }
        
        await fs.writeFile(filePath, JSON.stringify(p), 'utf-8');

        return res.json(p);
    } catch (error) {
        
        return res.status(500).json(error);
    }
})

router.get('*', function (req: Request, res: Response) {
    return res.status(404).json({ error: "Not found" })
});

export default router;