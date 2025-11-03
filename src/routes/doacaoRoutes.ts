import express from 'express';
import { DoacaoController } from '../controller/doacaoController';

export const doacaoRouter = express.Router();

const doacaoController = new DoacaoController();

doacaoRouter.get('/', doacaoController.getAll); 
doacaoRouter.get('/:id', doacaoController.getById);