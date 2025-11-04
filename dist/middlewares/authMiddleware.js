"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const authUtils_1 = require("../utils/authUtils");
class AuthMiddleware {
    static authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).send({ error: 'Token não fornecido' });
            }
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                return res.status(401).send({ error: 'Token malformatado' });
            }
            const payload = authUtils_1.AuthUtils.verifyToken(token);
            req.user = payload;
            next();
        }
        catch (error) {
            return res.status(401).send({ error: 'Token inválido ou expirado' });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map