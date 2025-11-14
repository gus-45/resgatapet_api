import express from 'express';
import { DoacaoController } from '../controller/doacaoController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const doacaoRouter = express.Router();

const doacaoController = new DoacaoController();

//Lista todas as doações (Público, com filtros) com as autenticação e autorização
doacaoRouter.get('/',AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ONG', 'ADMIN'), doacaoController.getAll);

// Busca por ID (Público)
doacaoRouter.get('/:id', doacaoController.getById);

//Registra uma doação (Usuário Comum autenticado ou anônimo)
doacaoRouter.post('/', doacaoController.create);