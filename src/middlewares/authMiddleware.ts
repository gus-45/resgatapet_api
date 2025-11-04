import { Request, Response, NextFunction } from 'express';
import { AuthUtils } from '../utils/authUtils';

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).send({ error: 'Token não fornecido' });
            }

            const token = authHeader.replace('Bearer ', '');

            if (!token) {
                return res.status(401).send({ error: 'Token malformatado' });
            }

            const payload = AuthUtils.verifyToken(token);
            req.user = payload;

            next();
        } catch (error: any) {
            return res.status(401).send({ error: 'Token inválido ou expirado' });
        }
    }
}