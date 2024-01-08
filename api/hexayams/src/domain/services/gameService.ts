import pastriesService from './pastriesService';
import { pastrieRepository } from '../../infrastructure/repositories/pastrieRepository';
import { modifyQuantityPastries } from '../../utils/helpers';
import { Pastrie } from '../entities/Pastrie';

export const gameService = {
    async winPastries(quantity: number): Promise<Pastrie[]> {
        return new Promise(async (resolve, reject) => {
            if (isNaN(quantity) || quantity <= 0) {
                reject(new Error('La quantité doit être un nombre entier positif.'));
            }
            try {
                const pastries = await pastrieRepository.readPastries();
                const pastriesWin = modifyQuantityPastries(pastries, quantity);
                await pastrieRepository.writePastries(pastries);
                resolve(pastriesWin);
            } catch (error) {
                reject(error);
            }
        });
    }
};