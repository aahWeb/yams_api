import path from 'path';
import { generateRandomString } from '../../utils/helpers';
import fs from 'fs/promises';

export const uploadService = {
    async validateAndUploadFile(file: Express.Multer.File, userId: string, allowed: string[], maxSize: number): Promise<string> {
        
        if (!this.checkFileIsValid(file, allowed, maxSize)) {
            throw new Error('Fichier non valide !');
        }

        const imagePath = this.generateImagePath(file, userId);

        await fs.writeFile(imagePath, file.buffer);

        return imagePath;
    },

    generateImagePath(file: Express.Multer.File, userId: string): string {
        const ext = path.extname(file.originalname);
        const filename = `${userId}/${generateRandomString(12)}${ext}`;
        const imagePath = path.join(__dirname, '../../uploads/', filename);

        return imagePath;
    },

    checkFileType(file: Express.Multer.File, allowed: string[]): boolean {
        const ext = path.extname(file.originalname);
        return allowed.includes(ext);
    },

    checkFileSize(file: Express.Multer.File, maxSize: number): boolean {
        return file.size <= maxSize;
    },

    checkPathTraversal(filePath: string): boolean {
        return !filePath.includes('..');
    },

    checkFileIsValid(file: Express.Multer.File, allowed: string[], maxSize: number): boolean {
        return  this.checkFileType(file, allowed) &&
                this.checkFileSize(file, maxSize) &&
                this.checkPathTraversal(file.originalname);
    }


};