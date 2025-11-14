import express from 'express';
import { AdocaoController } from '../controller/adocaoController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const adocaoRouter = express.Router();

const adocaoController = new AdocaoController();

// Lista todas (ONG, Admin)
adocaoRouter.get('/', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ONG', 'ADMIN'), adocaoController.getAll);

// Busca por ID (Usuário, ONG, Admin)
adocaoRouter.get('/:id', AuthMiddleware.authenticate, adocaoController.getById);

// Cria (Usuário Comum autenticado)
adocaoRouter.post("/", AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('COMUM'), adocaoController.create);

//  Atualiza status (ONG, Admin)
adocaoRouter.put('/:id/status', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ONG', 'ADMIN'), adocaoController.updateStatus);

// Remove (Admin - apenas Admin pode remover)
adocaoRouter.delete('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ADMIN'), adocaoController.delete);