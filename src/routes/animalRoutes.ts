import express from 'express'
import { AnimalController } from '../controller/animalController';

export const animalRouter = express.Router();

const animalController = new AnimalController();

// GET /animais
animalRouter.get('/', animalController.getAll); 

// GET /animais/:id
animalRouter.get('/:id', animalController.getById);