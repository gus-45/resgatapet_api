"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = void 0;
class AuthorizationMiddleware {
    static authorizeOwner(req, res, next) {
        try {
            const authenticatedUserId = req.user?.userId;
            const targetUserId = Number(req.params.id);
            if (!authenticatedUserId) {
                return res.status(401).send({ error: 'Usuário não autenticado' });
            }
            if (req.user?.tipo === 'admin') {
                return next();
            }
            if (authenticatedUserId !== targetUserId) {
                return res.status(403).send({
                    error: 'Você só pode visualizar, editar ou deletar sua própria conta'
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static authorize(...allowedRoles) {
        return (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).send({ error: 'Usuário não autenticado' });
                }
                if (!allowedRoles.includes(req.user.tipo)) {
                    return res.status(403).send({
                        error: 'Você não tem permissão para acessar este recurso'
                    });
                }
                next();
            }
            catch (error) {
                return res.status(500).send({ error: error.message });
            }
        };
    }
    static authorizeOngOwner(req, res, next) {
        try {
            const authenticatedUserId = req.user?.userId;
            const targetOngId = Number(req.params.id);
            if (!authenticatedUserId) {
                return res.status(401).send({ error: 'Usuário não autenticado' });
            }
            if (req.user?.tipo === 'admin') {
                return next();
            }
            if (req.user?.tipo === 'ong' && authenticatedUserId === targetOngId) {
                return next();
            }
            return res.status(403).send({
                error: 'Você só pode gerenciar sua própria ONG'
            });
        }
        catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
//# sourceMappingURL=authorizationMiddleware.js.map