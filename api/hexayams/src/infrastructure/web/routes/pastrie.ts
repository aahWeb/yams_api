import express, { Router } from 'express';
import { PastrieController } from '../controllers/PastrieController';

const pastrie: Router = express();

// endpoint: /pastries (GET)
pastrie.get('/', PastrieController.getAllPastries);

// endpoint: /pastries/count (GET)
pastrie.get('/count', PastrieController.getPastriesCount);

// endpoint: /pastries/:id (GET)
pastrie.get('/:id', PastrieController.getPastrieById);

// endpoint: /pastries/search/:word (GET)
pastrie.get('/search/:word', PastrieController.searchPastrie);

// endpoint: /pastries/search-word/:word (GET)
pastrie.get('/search-word/:word', PastrieController.searchPastrieByWord);

// endpoint: /pastries/range/:offset/:limit (GET)
pastrie.get('/range/:offset/:limit', PastrieController.getPastriesWithPagination);

// endpoint: /pastries/order-quantity/:offset/:limit (GET)
pastrie.get('/order-quantity/:offset/:limit', PastrieController.getPastriesByQuantity);

// endpoint: /pastries (POST)
pastrie.post('/', PastrieController.addPastrie);

// endpoint: /pastries/:id (PUT)
pastrie.put('/:id', PastrieController.updatePastrie);

// endpoint: /pastries/:id (DELETE)
pastrie.delete('/:id', PastrieController.deletePastrie);

export default pastrie;