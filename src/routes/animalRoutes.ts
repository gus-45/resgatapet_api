import express from 'express'
import { AnimalController } from '../controller/animalController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const animalRouter = express.Router();

const animalController = new AnimalController();

// Lista todos (Público)
animalRouter.get('/', animalController.getAll);

//Busca por ID (Público)
animalRouter.get('/:id', animalController.getById);

// Cria um novo animal (ONG, Admin - criação é da ONG/Admin)
animalRouter.post('/', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ong', 'admin'), animalController.create);

//Atualiza (ONG para seus animais, Admin)
animalRouter.put('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ong', 'admin'), animalController.update);

// Remove (Admin -  Admin pode remover)
animalRouter.delete('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('admin'), animalController.delete);

//Define prioridade (ONG, Admin)
animalRouter.post('/:id/prioridade', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ong', 'admin'), animalController.setPrioridade);