
import express from 'express';
import { OcorrenciaController } from '../controller/ocorrenciaController';

export const ocorrenciaRouter = express.Router();

const ocorrenciaController = new OcorrenciaController();


ocorrenciaRouter.get('/', ocorrenciaController.getAll); 

ocorrenciaRouter.get('/:id', ocorrenciaController.getById);

ocorrenciaRouter.post('/', ocorrenciaController.create);