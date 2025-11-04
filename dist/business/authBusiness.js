"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBusiness = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authData_1 = require("../data/authData");
const authUtils_1 = require("../utils/authUtils");
class AuthBusiness {
    constructor() {
        this.authData = new authData_1.AuthData();
    }
    async login(input) {
        try {
            if (!input.email || !input.senha) {
                throw new Error('Email e senha são obrigatórios');
            }
            const user = await this.authData.getUserByEmail(input.email);
            if (!user) {
                throw new Error('Credenciais inválidas');
            }
            const passwordMatch = await bcryptjs_1.default.compare(input.senha, user.senha);
            if (!passwordMatch) {
                throw new Error('Credenciais inválidas');
            }
            const token = authUtils_1.AuthUtils.generateToken({
                userId: user.id || user.id_usuario || user.id_ong,
                email: user.email,
                tipo: user.tipo
            });
            return {
                token,
                user: {
                    id: user.id || user.id_usuario || user.id_ong,
                    nome: user.nome,
                    email: user.email,
                    tipo: user.tipo
                }
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AuthBusiness = AuthBusiness;
//# sourceMappingURL=authBusiness.js.map