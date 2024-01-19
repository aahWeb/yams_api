import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) => {
    console.log("middleware", file)
    cb(null, path.join(__dirname, '../uploads/images/') ); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    console.log(file)
    cb(null, `${Date.now()}${ext}`);
  }
});

export const upload: Multer = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });