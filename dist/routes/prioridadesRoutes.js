"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prioridadeRouter = void 0;
const express_1 = __importDefault(require("express"));
const prioridadesController_1 = require("../controller/prioridadesController");
exports.prioridadeRouter = express_1.default.Router();
const prioridadeController = new prioridadesController_1.PrioridadeController();
exports.prioridadeRouter.get('/', prioridadeController.getAll);
exports.prioridadeRouter.get('/:id', prioridadeController.getById);
//# sourceMappingURL=prioridadesRoutes.js.map