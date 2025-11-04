"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const usuarioController_1 = require("../controller/usuarioController");
exports.userRouter = express_1.default.Router();
const userController = new usuarioController_1.UserController();
exports.userRouter.get('/', userController.getAll);
exports.userRouter.get('/:id', userController.getById);
//# sourceMappingURL=usuarioRoutes.js.map