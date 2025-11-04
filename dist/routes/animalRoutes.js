"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalRouter = void 0;
const express_1 = __importDefault(require("express"));
const animalController_1 = require("../controller/animalController");
exports.animalRouter = express_1.default.Router();
const animalController = new animalController_1.AnimalController();
// GET /animais
exports.animalRouter.get('/', animalController.getAll);
// GET /animais/:id
exports.animalRouter.get('/:id', animalController.getById);
//# sourceMappingURL=animalRoutes.js.map