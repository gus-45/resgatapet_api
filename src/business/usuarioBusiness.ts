import { UserData } from "../data/usuarioData";
import { User } from "../types/usuario";

export class UserBusiness {
    private userData = new UserData(); 

    public async getAllUsers(): Promise<User[]> {
        try{
            const users = await this.userData.getAllUsers();
            return users;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getUserById(id_usuario: number): Promise<User | undefined> {
        try{
            const user = await this.userData.getUserById(id_usuario);
            return user;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}