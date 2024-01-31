import { pastrieRepository } from '../../infrastructure/repositories/pastryRepository';
import { Pastry } from '../entities/Pastry';
import path from 'path';

const pastriesService = {

    // service qui récupère toutes les pâtisseries
    async getAllPastries(): Promise<Pastry[]> {
        return pastrieRepository.readPastries();
    },

    // service qui récupère une pâtisserie en fonction de son id
    async getPastrieById(id: string): Promise<Pastry | undefined> {
        const pastries = await this.getAllPastries();
        return pastries.find(p => p.id === id);
    },

    // service qui récupère une pâtisserie en fonction d'un mot
    async searchPastry(searchTerm: string): Promise<Pastry | undefined> {
        const pastries = await this.getAllPastries();
        const regex = new RegExp(searchTerm.trim(), 'i');
        return pastries.find(p => p.name.match(regex));
    },

    // service qui récupère des pâtisseries avec offset et limit
    async getPastriesByQuantity(offset: number, limit: number): Promise<Pastry[]> {
        const pastries = await this.getAllPastries();
        return pastries.sort((a, b) => b.quantity - a.quantity).slice(offset, offset + limit);
    },

    // service qui récupère des pâtisseries en fonction d'un mot
    async searchPastrieByWord(word: string): Promise<Pastry[]> {
        const pastries = await this.getAllPastries();
        const regex = new RegExp(word.trim(), 'i');
        return pastries.filter(p => p.name.match(regex));
    },

    // service qui récupère des pâtisseries avec offset et limit
    async getPastriesWithPagination(offset: number, limit: number): Promise<Pastry[]> {
        const pastries = await this.getAllPastries();
        return pastries.slice(offset, offset + limit);
    },

    // service qui récupère le nombre de pâtisseries
    async getPastriesCount(): Promise<number> {
        const pastries = await this.getAllPastries();
        return pastries.length;
    },

    // service qui ajoute une pâtisserie
    async addPastry(pastryData: Pastry): Promise<Pastry> {
        const pastries = await this.getAllPastries();
        const newPastry = {
            ...pastryData,
            id: ((parseInt((pastries[pastries.length - 1]?.id) || "0")) + 1).toString()
        };
        pastries.push(newPastry);
        await pastrieRepository.writePastries(pastries);

        return newPastry;
    },

    // service qui met à jour une pâtisserie
    async updatePastry(id: string, updateData: Partial<Pastry>): Promise<Pastry | undefined> {
        const pastries = await this.getAllPastries();
        const pastrieIndex = pastries.findIndex(p => p.id === id);
        if (pastrieIndex === -1) {
            return undefined;
        }

        // on récupère la pâtisserie à modifier, on la met à jour avec les données reçues, puis on la remet dans le tableau
        const updatedPastrie = { ...pastries[pastrieIndex], ...updateData };
        pastries[pastrieIndex] = updatedPastrie;
        await pastrieRepository.writePastries(pastries);

        return updatedPastrie;
    },

    // service qui supprime une pâtisserie
    async deletePastrie(id: string): Promise<void> {
        const pastries = await this.getAllPastries();
        const updatedPastries = pastries.filter(p => p.id !== id);
        await pastrieRepository.writePastries(updatedPastries);
    },

    // service qui gère l'upload d'une image pour une pâtisserie
    async uploadImage(image: Express.Multer.File): Promise<string> {
        const ext = path.extname(image.originalname);
        // Logique pour stocker l'image, par exemple, vous pouvez utiliser le même dossier 'uploads'
        const imagePath = `${Date.now()}${ext}`;

        return imagePath;
    }
};

export default pastriesService;