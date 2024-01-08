import { Request } from 'express';
import { Pastrie } from '../domain/entities/Pastrie';

export interface CustomRequest extends Request {
    locals?: {
        pastries: Pastrie[];
        // ...
    };
}