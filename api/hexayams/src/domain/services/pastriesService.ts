import { pastrieRepository } from '../../infrastructure/repositories/pastrieRepository';
import { Pastrie } from '../entities/Pastrie';

const pastriesService = {

    // service qui récupère toutes les pâtisseries
    async getAllPastries(): Promise<Pastrie[]> {
        return pastrieRepository.readPastries();
    },

    // service qui récupère une pâtisserie en fonction de son id
    async getPastrieById(id: string): Promise<Pastrie | undefined> {
        const pastries = await this.getAllPastries();
        return pastries.find(p => p.id === id);
    },

    // service qui récupère une pâtisserie en fonction d'un mot
    async searchPastrie(searchTerm: string): Promise<Pastrie | undefined> {
        const pastries = await this.getAllPastries();
        const regex = new RegExp(searchTerm.trim(), 'i');
        return pastries.find(p => p.name.match(regex));
    },

    // service qui récupère des pâtisseries avec offset et limit
    async getPastriesByQuantity(offset: number, limit: number): Promise<Pastrie[]> {
        const pastries = await this.getAllPastries();
        return pastries.sort((a, b) => b.quantity - a.quantity).slice(offset, offset + limit);
    },

    // service qui récupère des pâtisseries en fonction d'un mot
    async searchPastrieByWord(word: string): Promise<Pastrie[]> {
        const pastries = await this.getAllPastries();
        const regex = new RegExp(word.trim(), 'i');
        return pastries.filter(p => p.name.match(regex));
    },

    // service qui récupère des pâtisseries avec offset et limit
    async getPastriesWithPagination(offset: number, limit: number): Promise<Pastrie[]> {
        const pastries = await this.getAllPastries();
        return pastries.slice(offset, offset + limit);
    },

    // service qui récupère le nombre de pâtisseries
    async getPastriesCount(): Promise<number> {
        const pastries = await this.getAllPastries();
        return pastries.length;
    },

    // service qui ajoute une pâtisserie
    async addPastrie(pastrieData: Pastrie): Promise<Pastrie> {
        const pastries = await this.getAllPastries();
        const newPastrie = { ...pastrieData, id: (pastries.length + 1).toString() };
        pastries.push(newPastrie);
        await pastrieRepository.writePastries(pastries);
        return newPastrie;
    },

    // service qui met à jour une pâtisserie
    async updatePastrie(id: string, updateData: Partial<Pastrie>): Promise<Pastrie | undefined> {
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
    }
};

export default pastriesService;
