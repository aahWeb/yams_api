import pastriesService from './pastriesService';
import { pastrieRepository } from '../../infrastructure/repositories/pastrieRepository';
import { modifyQuantityPastries } from '../../utils/helpers';
import { Pastrie } from '../entities/Pastrie';

const gameService = {
    async winPastries(quantity: number): Promise<Pastrie[]> {
        let pastries = await pastriesService.getAllPastries();
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error('La quantité doit être un nombre entier positif.');
        }

        pastries = modifyQuantityPastries(pastries, quantity);
        await pastrieRepository.writePastries(pastries);
        return pastries;
    }
};

export default gameService;