"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doacaoRouter = void 0;
const express_1 = __importDefault(require("express"));
const doacaoController_1 = require("../controller/doacaoController");
exports.doacaoRouter = express_1.default.Router();
const doacaoController = new doacaoController_1.DoacaoController();
exports.doacaoRouter.get('/', doacaoController.getAll);
exports.doacaoRouter.get('/:id', doacaoController.getById);
//# sourceMappingURL=doacaoRoutes.js.map