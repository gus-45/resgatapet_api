import express from 'express'
import { UserController } from '../controller/usuarioController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get('/', userController.getAll); 

userRouter.get('/:id', userController.getById);