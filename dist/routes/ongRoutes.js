"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ongRouter = void 0;
const express_1 = __importDefault(require("express"));
const ongController_1 = require("../controller/ongController");
exports.ongRouter = express_1.default.Router();
const ongController = new ongController_1.OngController();
exports.ongRouter.get('/', ongController.getAll);
exports.ongRouter.get('/:id', ongController.getById);
//# sourceMappingURL=ongRoutes.js.map