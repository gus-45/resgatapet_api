import express from 'express';
import { PrioridadeController } from '../controller/prioridadesController';

export const prioridadeRouter = express.Router();

const prioridadeController = new PrioridadeController();

prioridadeRouter.get('/', prioridadeController.getAll); 
prioridadeRouter.get('/:id', prioridadeController.getById);