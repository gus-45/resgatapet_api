import express from 'express'
import { UserController } from '../controller/usuarioController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { AuthorizationMiddleware } from '../middlewares/authorizationMiddleware';

export const userRouter = express.Router();

const userController = new UserController();

// Lista todos os usuários ( apenas Admin)
userRouter.get('/', AuthMiddleware.authenticate, AuthorizationMiddleware.authorize('admin'), userController.getAll);

//  Busca por ID (próprio usuário ou Admin)
userRouter.get('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeOwner, userController.getById);

//  Cadastra um novo usuário (Público)
userRouter.post('/', userController.create);

//  Atualiza um usuário (próprio usuário ou Admin)
userRouter.put('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeOwner, userController.update);

//  Remove um usuário (próprio usuário ou Admin)
userRouter.delete('/:id', AuthMiddleware.authenticate, AuthorizationMiddleware.authorizeOwner, userController.delete);