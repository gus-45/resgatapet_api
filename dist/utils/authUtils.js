"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;
class AuthUtils {
    static generateToken(payload) {
        if (!JWT_SECRET) {
            throw new Error('A variável de ambiente JWT_SECRET é obrigatória e não está configurada no arquivo .env.');
        }
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    static verifyToken(token) {
        if (!JWT_SECRET) {
            throw new Error('A variável de ambiente JWT_SECRET é obrigatória e não está configurada no arquivo .env.');
        }
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }
    static async hashPassword(password) {
        return bcryptjs_1.default.hash(password, BCRYPT_ROUNDS);
    }
    static async comparePassword(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
}
exports.AuthUtils = AuthUtils;
//# sourceMappingURL=authUtils.js.map