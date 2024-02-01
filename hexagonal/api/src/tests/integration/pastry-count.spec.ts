import express, { Express } from 'express';
import request from 'supertest';
import { authentifiedMock } from '../mocks/authServiceMock'; 

jest.mock('../../middlewares/authentified', () => ({
    authentified: authentifiedMock,
}));

import pastrie from '../../infrastructure/web/routes/pastry';

const app: Express = express();
app.use('/api', pastrie);

describe('GET /pastries-count', () => {
    it('responds with the count of pastries for an authenticated user', async () => {
        const numberPastries = 15;
        const response = await request(app).get('/api/pastry/count');

        // expect(response.body).toHaveLength(6);
        expect(response.statusCode).toBe(200);
        
        expect(response.body).toEqual({count: numberPastries});
    });
});
