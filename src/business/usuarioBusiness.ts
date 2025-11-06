import { UserData } from "../data/usuarioData";
import { User } from "../types/usuario";
import { PaginatedResponse } from "../dto/paginationDto";
import { UserFilterDTO } from "../dto/userFilterDto"; 
import {FilterUtilsUsuario} from '../utils/FilterUtilsUsuario'; 

export class UserBusiness {
    private userData = new UserData(); 

    public async getAllUsers(filter: UserFilterDTO): Promise<PaginatedResponse<User>> { 
        try{
            const completeFilter = FilterUtilsUsuario.applyUserDefaults(filter); 
            
            const users = await this.userData.getAllUsers(completeFilter); 
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