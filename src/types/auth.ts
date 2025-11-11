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


export interface AuthUserResponse {
    id_usuario?: number; 
    id_ong?: number; 
    id?: number; 
    nome: string;
    email: string;
    senha: string;
    tipo: 'COMUM' | 'ONG' | 'ADMIN' | 'usuario'; // 'usuario' vem do Data
}

