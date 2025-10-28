import connection from "../dbConnection";
import { User } from "../types/usuario";

export class UserData {

    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await connection('Usuario').select(); 
            return users as User[];
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserById(id_usuario: number): Promise<User | undefined> {
        try {
            const user = await connection('Usuario').where({ id_usuario }).first();
            return user as User | undefined;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}