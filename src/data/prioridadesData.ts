import connection from "../dbConnection";
import { Prioridade } from "../types/prioridades";
import { PaginatedResponse } from "../dto/paginationDto";
import { PrioridadeFilterDTO } from "../dto/prioridadeFilterDto";

export class PrioridadeData {

    public async getAllPrioridades(filter: Required<PrioridadeFilterDTO>): Promise<PaginatedResponse<Prioridade>> { 
        try {
            const { nivel, animal_id, page, limit, sortBy, sortOrder } = filter;

            let query = connection('prioridade').select(); 

            if (nivel) {
                query = query.where('nivel', 'like', `%${nivel}%`); 
            }
            if (animal_id && animal_id > 0) {
                query = query.where('animal_id', animal_id); 
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
            const pagination: PaginatedResponse<Prioridade> = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data as Prioridade[]
            };

            return pagination; 
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // Busca uma prioridade por ID
    public async getPrioridadeById(id_prioridade: number): Promise<Prioridade | undefined> {
        try {
            const prioridade = await connection('prioridade').where({ id_prioridade }).first();
            return prioridade as Prioridade | undefined;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}