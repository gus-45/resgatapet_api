"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adocaoRouter = void 0;
const express_1 = __importDefault(require("express"));
const adocaoController_1 = require("../controller/adocaoController");
exports.adocaoRouter = express_1.default.Router();
const adocaoController = new adocaoController_1.AdocaoController();
exports.adocaoRouter.get('/', adocaoController.getAll);
exports.adocaoRouter.get('/:id', adocaoController.getById);
exports.adocaoRouter.post("/", adocaoController.create);
//# sourceMappingURL=adocaoRoutes.js.map