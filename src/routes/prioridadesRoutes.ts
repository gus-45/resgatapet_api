import express from 'express';
import { PrioridadeController } from '../controller/prioridadesController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const prioridadeRouter = express.Router();

const prioridadeController = new PrioridadeController();

//Lista todas (Público)
prioridadeRouter.get('/', prioridadeController.getAll);

//Busca por ID (Público)
prioridadeRouter.get('/:id', prioridadeController.getById);

// Cria nova categoria (Admin)
prioridadeRouter.post('/', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ADMIN'), prioridadeController.create);

// Atualiza categoria (Admin)
prioridadeRouter.put('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ADMIN'), prioridadeController.update);

// Remove categoria (Admin)
prioridadeRouter.delete('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ADMIN'), prioridadeController.delete);