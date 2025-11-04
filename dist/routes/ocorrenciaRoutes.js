"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocorrenciaRouter = void 0;
const express_1 = __importDefault(require("express"));
const ocorrenciaController_1 = require("../controller/ocorrenciaController");
exports.ocorrenciaRouter = express_1.default.Router();
const ocorrenciaController = new ocorrenciaController_1.OcorrenciaController();
exports.ocorrenciaRouter.get('/', ocorrenciaController.getAll);
exports.ocorrenciaRouter.get('/:id', ocorrenciaController.getById);
exports.ocorrenciaRouter.post('/', ocorrenciaController.create);
//# sourceMappingURL=ocorrenciaRoutes.js.map