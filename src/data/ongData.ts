import connection from "../dbConnection";
import { Ong } from "../types/ong";
import { PaginatedResponse } from "../dto/paginationDto";
import { OngFilterDTO } from "../dto/ongFilterDto";

export class OngData {

    public async getAllOngs(filter: Required<OngFilterDTO>): Promise<PaginatedResponse<Ong>> { 
        try {
            const { nome, cidade, page, limit, sortBy, sortOrder } = filter;

            let query = connection('ONG').select(); 

            if (nome) {
                query = query.where('nome', 'like', `\%${nome}\%`); 
            }
            if (cidade) {
                query = query.where('cidade', 'like', `\%${cidade}\%`); 
            }

            // Contagem Total 
            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total'); 

            query = query.orderBy(sortBy, sortOrder);

            const offset = (page - 1) * limit; 
            query = query.limit(limit).offset(offset);

            const data = await query;

            // Montar o objeto de resposta paginada
            const totalPages = Math.ceil(Number(total) / limit); 
            const pagination: PaginatedResponse<Ong> = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data as Ong[]
            };

            return pagination; 
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // Busca uma ONG por ID
    public async getOngById(id_ong: number): Promise<Ong | undefined> {
        try {
            const ong = await connection('ONG').where({ id_ong }).first();
            return ong as Ong | undefined;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}