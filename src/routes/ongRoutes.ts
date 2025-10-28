import express from 'express'
import { OngController } from '../controller/ongController';

export const ongRouter = express.Router();

const ongController = new OngController();

ongRouter.get('/', ongController.getAll); 
ongRouter.get('/:id', ongController.getById);