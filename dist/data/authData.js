"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class AuthData {
    async getUserByEmail(email) {
        try {
            let user = await (0, dbConnection_1.default)('Usuario').where({ email }).first();
            if (user) {
                return { ...user, tipo: user.tipo || 'usuario' };
            }
            user = await (0, dbConnection_1.default)('ONG').where({ email }).first();
            if (user) {
                return {
                    ...user,
                    tipo: 'ong',
                    id: user.id_ong,
                    name: user.nome
                };
            }
            return null;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.AuthData = AuthData;
//# sourceMappingURL=authData.js.map