import express from 'express';
import { AdocaoController } from '../controller/adocaoController';

export const adocaoRouter = express.Router();

const adocaoController = new AdocaoController();

adocaoRouter.get('/', adocaoController.getAll); 
adocaoRouter.get('/:id', adocaoController.getById);
adocaoRouter.post("/", adocaoController.create);