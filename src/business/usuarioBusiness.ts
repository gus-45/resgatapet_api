import { UserData } from "../data/usuarioData";
import { User } from "../types/usuario";
import { PaginatedResponse } from "../dto/paginationDto";
import { UserFilterDTO } from "../dto/userFilterDto";
import { FilterUtilsUsuario } from "../utils/filterUtilsUsuario";
import { AuthUtils } from '../utils/authUtils';
import { UsuarioCreateDTO, UsuarioUpdateDTO } from "../dto/usuarioDto";

export class UserBusiness {
    private userData = new UserData();

    public async getAllUsers(filter: UserFilterDTO): Promise<PaginatedResponse<User>> {
        try {
            const completeFilter = FilterUtilsUsuario.applyUserDefaults(filter);
            const users = await this.userData.getAllUsers(completeFilter);
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getUserById(id_usuario: number): Promise<User | undefined> {
        try {
            const user = await this.userData.getUserById(id_usuario);
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async createUser(input: UsuarioCreateDTO): Promise<User> {
        try {
            if (!input.nome || !input.email || !input.senha || !input.tipo) {
                throw new Error("Campos obrigatórios ausentes: nome, email, senha e tipo.");
            }

            const userExists = await this.userData.getUserByEmail(input.email);
            if (userExists) {
                throw new Error("Email já cadastrado.");
            }

            const hashedPassword = await AuthUtils.hashPassword(input.senha);

            const newUserParaDB = {
                ...input,
                senha: hashedPassword,
                data_criacao: new Date(),
            };

            const userId = await this.userData.createUser(newUserParaDB);
            return { ...newUserParaDB, id_usuario: userId };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateUser(id_usuario: number, input: UsuarioUpdateDTO): Promise<void> {
        try {
            const userToUpdate = await this.userData.getUserById(id_usuario);
            if (!userToUpdate) {
                throw new Error("Usuário não encontrado.");
            }

            const userWithSameEmail = await this.userData.getUserByEmail(input.email);
            if (userWithSameEmail && userWithSameEmail.id_usuario !== id_usuario) {
                throw new Error("Email já cadastrado por outro usuário.");
            }

            let hashedPassword = userToUpdate.senha; 

            // verifica se a senha nova é a mesma que a hash antiga, se não for, faz o hash da nova senha 
            const isSamePassword = await AuthUtils.comparePassword(input.senha, userToUpdate.senha);
            
            if (!isSamePassword) {
                // Se a senha for diferente, fazemos o novo hash
                hashedPassword = await AuthUtils.hashPassword(input.senha);
            }

            const updatedUser: UsuarioUpdateDTO = {
                ...input,
                senha: hashedPassword, // Usa a senha hash
            };

            await this.userData.updateUser(id_usuario, updatedUser);

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteUser(id_usuario: number): Promise<void> {
        try {
            const user = await this.userData.getUserById(id_usuario);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            if (user.tipo === "ADMIN") {
                throw new Error("A exclusão de um usuário Administrador não é permitida.");
            }

            await this.userData.deleteUser(id_usuario);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
