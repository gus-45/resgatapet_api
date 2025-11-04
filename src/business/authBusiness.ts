import bcrypt from 'bcryptjs';
import { AuthData } from '../data/authData';
import { LoginInput, AuthResponse } from '../dto/authDto';
import { AuthUtils } from '../utils/authUtils';

export class AuthBusiness {
    private authData = new AuthData();

    async login(input: LoginInput): Promise<AuthResponse> {
        try {
            if (!input.email || !input.senha) {
                throw new Error('Email e senha são obrigatórios');
            }

            const user = await this.authData.getUserByEmail(input.email);

            if (!user) {
                throw new Error('Credenciais inválidas');
            }

            const passwordMatch = await bcrypt.compare(input.senha, user.senha);

            if (!passwordMatch) {
                throw new Error('Credenciais inválidas');
            }

            const token = AuthUtils.generateToken({
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
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}