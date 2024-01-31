import express, { Router } from 'express';
import { PastryController } from '../controllers/PastryController';
import { authentified } from '../../../middlewares/authentified';
import { upload } from '../../../middlewares/upload';

const pastrie: Router = express();

// endpoint: /pastries (GET)
pastrie.get('/pastries', authentified, PastryController.getAllPastries);

// endpoint: /pastries/count (GET)
pastrie.get('/pastry/count',authentified, PastryController.getPastriesCount);

// endpoint: /pastries/:id (GET)
pastrie.get('/pastry/:id', authentified, PastryController.getPastrieById);

// endpoint: /pastries/search/:word (GET)
pastrie.get('/pastry/search/:word', authentified, PastryController.searchPastry);

// endpoint: /pastries/search-word/:word (GET)
pastrie.get('/pastry/search-word/:word', authentified, PastryController.searchPastrieByWord);

// endpoint: /pastries/range/:offset/:limit (GET)
pastrie.get('/pastry/range/:offset/:limit', authentified, PastryController.getPastriesWithPagination);

// endpoint: /pastries/order-quantity/:offset/:limit (GET)
pastrie.get('/pastry/order-quantity/:offset/:limit', authentified, PastryController.getPastriesByQuantity);

// endpoint: /pastries (POST)
pastrie.post('/pastry',authentified, upload.single('image'), PastryController.addPastry);

// endpoint: /pastries/:id (PUT)
pastrie.put('/pastry/:id',authentified, PastryController.updatePastrie);

// endpoint: /pastries/:id (DELETE)
pastrie.delete('/pastry/:id', authentified, PastryController.deletePastrie);

export default pastrie;