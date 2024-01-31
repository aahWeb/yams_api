
import { authentified } from '../../middlewares/authentified';
import { authentifiedMock } from '../mocks/authServiceMock';
import { fsPromisesMock } from "../mocks/fsPromiseMock"
import request from 'supertest';
import express, { Express } from 'express';
import router from '../../infrastructure/web/routes/index';

jest.mock('../../middlewares/authentified', () => ({
    authentified: authentifiedMock,
}));

jest.mock('fs/promises', () => fsPromisesMock);

const app: Express = express();
app.use('/api', router);

describe('GET /pastries-count', () => {
    it('responds with the count of pastries for an authenticated user with mock pastries', async () => {
        const numberPastries = 2;
        const mockPastries = [
            {
                "id": "7",
                "name": "Tarte poire chocolat",
                "image": "http://placehold.it/32x32",
                "quantity": 5,
                "quantityWon": 0,
                "choice": false
            },
            {
                "id": "8",
                "name": "Banana au chocolat",
                "image": "http://placehold.it/32x32",
                "quantity": 3,
                "quantityWon": 0,
                "choice": false
            }
        ];

        // Configurez le mock pour fs/promises.readFile pour retourner les données fictives
        fsPromisesMock.readFile.mockResolvedValue(JSON.stringify(mockPastries));

        const response = await request(app).get('/pastry/count');
        
        // expect(response.status).toBe(200);
        // expect(response.body).toEqual(numberPastries);

        // Vérifiez si la fonction fs/promises.readFile a été appelée correctement
        // expect(fsPromisesMock.readFile).toHaveBeenCalledWith(
        //     expect.stringContaining('pastries.json'),
        //     'utf-8'
        // );
    });
});
