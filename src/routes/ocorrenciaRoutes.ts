import express from 'express';
import { OcorrenciaController } from '../controller/ocorrenciaController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const ocorrenciaRouter = express.Router();

const ocorrenciaController = new OcorrenciaController();

//  Lista todos (Público)
ocorrenciaRouter.get('/', ocorrenciaController.getAll);

//  Busca por ID (Público)
ocorrenciaRouter.get('/:id', ocorrenciaController.getById);

//  Cria (Usuário Comum autenticado ou anônimo)
ocorrenciaRouter.post('/', ocorrenciaController.create);

//Atualiza status (ONG, Admin)
ocorrenciaRouter.put('/:id/status', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('ong', 'admin'), ocorrenciaController.updateStatus);

//Remove (Admin -  apenas Admin pode remover)
ocorrenciaRouter.delete('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('admin'), ocorrenciaController.delete);