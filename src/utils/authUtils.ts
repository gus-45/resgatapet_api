import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export interface TokenPayload {
    userId: number;
    email: string;
    tipo: string;
}

export class AuthUtils {
    static generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static verifyToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, JWT_SECRET) as TokenPayload;
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}