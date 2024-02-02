import path from 'path';
import { generateRandomString } from '../../utils/helpers';
import fs from 'fs/promises';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${generateRandomString(12)}${ext}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: function(req, file, cb) {
        cb(null, true);
    }
});

export const uploadService = {
    upload: upload.single('image'),

    async validateAndUploadFile(file: Express.Multer.File, userId: string, allowed: string[], maxSize: number): Promise<string> {
        this.validateFile(file, allowed, maxSize)

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

    validateFile(file: Express.Multer.File, allowed: string[], maxSize: number): boolean {
        if (!this.checkFileType(file, allowed))
            throw new Error('Type de fichier non valide !');

        if (!this.checkFileSize(file, maxSize))
            throw new Error('Fichier trop volumineux !');

        if (!this.checkPathTraversal(file.originalname))
            throw new Error('Nom de fichier invalide !');

        return true;
    }

};