import connection from "../dbConnection";
import { AuthUserResponse } from "../types/auth";

export class AuthData {
    async getUserByEmail(email: string): Promise<AuthUserResponse | null> {
        try {
            let user = await connection('Usuario').where({ email }).first();
            
            if (user) {
                return { ...user, tipo: user.tipo || 'usuario' };
            }

            user = await connection('ONG').where({ email }).first();
            
            if (user) {
                return { 
                    ...user, 
                    tipo: 'ong',
                    id: user.id_ong,
                    name: user.nome 
                };
            }

            return null;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}