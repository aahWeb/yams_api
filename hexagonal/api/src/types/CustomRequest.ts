import { Request } from 'express';
import { Pastry } from '../domain/entities/Pastry';

export interface CustomRequest extends Request {
    locals?: {
        pastries: Pastry[];
        // ...
    };
}