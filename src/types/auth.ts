export interface TokenPayload {
    userId: number;
    email: string;
    tipo: 'usuario' | 'ong' | 'admin';
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                email: string;
                tipo: string;
            };
        }
    }
}