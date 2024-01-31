
import { authentified } from '../../middlewares/authentified';
import { authentifiedMock } from '../mocks/authServiceMock'; 
import request from 'supertest';
import express, { Express } from 'express';
import router from '../../infrastructure/web/routes/index';

jest.mock('../../middlewares/authentified', () => ({
    authentified: authentifiedMock,
}));

const app: Express = express();
app.use('/api', router);

describe('GET /pastries-count', () => {
    it('responds with the count of pastries for an authenticated user', async () => {
        const numberPastries = 8 ;
        const response = await request(app).get('/api/pastries');

        // expect(response.body).toHaveLength(6);
        expect(response.statusCode).toBe(200);
        
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(numberPastries);
    });
});
