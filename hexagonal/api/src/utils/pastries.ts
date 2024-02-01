import { Request } from 'express';
import { Pastry } from "../domain/entities/Pastry";
import { trimAll } from "./helpers";

export const parsePastryData = (req: Request): Partial<Pastry> => {
    return req?.file ? trimAll(JSON.parse(req.body?.pastry)) : trimAll(req.body);
};

export const validatePastryData = ({ name, quantity }: Partial<Pastry>): void => {
    if (!name || !quantity) {
        throw new Error('Données invalides !');
    }
};

export const modifyQuantityPastries = (pastries: Pastry[], quantity: number): Pastry[] => {
    // on récupère les patisseries dont la qty est > 0
    pastries = pastries?.filter(p => p.quantity > 0) || []

    // on les shuffle
    pastries?.sort(_ => Math.random() - .5)

    // calcul le total des patisseries 
    const total = (p: Pastry[]) => p?.reduce((acc, curr) => acc + curr.quantity, 0)

    // error/exception firts pas assez de patisserie le jeu s'arrête
    if (total(pastries) < quantity) return []

    const pastriesWin: Pastry[] = [];

    let [i, totalPastriesWin] = [0, 0];
    while (totalPastriesWin != quantity) {
        if (i == pastries.length) i = 0
        if (pastries[i].quantity > 0) {

            if (!pastriesWin.includes(pastries[i])) {
                pastriesWin.push(pastries[i])
            }
            totalPastriesWin++

            // update quantity
            pastries[i].quantity = pastries[i].quantity - 1;
            pastries[i].quantityWon = (pastries[i]?.quantityWon || 0) + 1;
        }

        i++;
    }

    return pastriesWin
};