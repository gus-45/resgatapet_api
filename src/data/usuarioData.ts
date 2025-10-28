import connection from "../dbConnection";
import { User } from "../types/usuario";
import { PaginatedResponse } from "../dto/paginationDto"; 
import { UserFilterDTO } from "../dto/userFilterDto"; 

export class UserData {

    public async getAllUsers(filter: Required<UserFilterDTO>): Promise<PaginatedResponse<User>> { 
        try {
            const { name, email, page, limit, sortBy, sortOrder } = filter; 

            let query = connection('Usuario').select(); 

            if (name) {
                query = query.where('nome', 'like', `\%${name}\%`);
            }
            if (email) {
                query = query.where('email', 'like', `\%${email}\%`);
            }

            // ClonaPra pegar o TOTAL de itens
            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total'); //

            query = query.orderBy(sortBy, sortOrder);

            //  Paginação (LIMIT e OFFSET)
            const offset = (page - 1) * limit; 
            query = query.limit(limit).offset(offset);

            const data = await query;

            const totalPages = Math.ceil(Number(total) / limit); // Calcula total de páginas
            const pagination: PaginatedResponse<User> = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data as User[]
            };

            return pagination; 
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