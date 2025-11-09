import connection from "../dbConnection";
import { Adocao } from "../types/adocao";
import { PaginatedResponse } from "../dto/paginationDto";
import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";

export class AdocaoData {

    public async getAllAdocoes(filter: Required<AdocaoFilterDTO>): Promise<PaginatedResponse<Adocao>> { 
        try {
            const { status, ong_id, usuario_id, animal_id, page, limit, sortBy, sortOrder } = filter;

            let query = connection('adocao').select(); 

            if (status) {
                query = query.where('status', 'like', `%${status}%`); 
            }
            if (ong_id && ong_id > 0) {
                query = query.where('ong_id', ong_id); 
            }
            if (usuario_id && usuario_id > 0) {
                query = query.where('usuario_id', usuario_id); 
            }
            if (animal_id && animal_id > 0) {
                query = query.where('animal_id', animal_id); 
            }

            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total'); 

            query = query.orderBy(sortBy, sortOrder);

            const offset = (page - 1) * limit; 
            query = query.limit(limit).offset(offset);

            const data = await query;

            const totalPages = Math.ceil(Number(total) / limit); 
            const pagination: PaginatedResponse<Adocao> = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data as Adocao[]
            };

            return pagination; 
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAdocaoById(id_adocao: number): Promise<Adocao | undefined> {
        try {
            const adocao = await connection('adocao').where({ id_adocao }).first();
            return adocao as Adocao | undefined;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async createAdocao(adocao: Omit<Adocao, "id_adocao">): Promise<void> {
        try {
            await connection("Adocao").insert(adocao);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async updateAdocaoStatus(id_adocao: number, status: string): Promise<void> {
        try {
            // aceita ou não a adoção
            await connection('adocao').where({ id_adocao }).update({ status });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async deleteAdocao(id_adocao: number): Promise<void> {
        try {
            await connection('adocao').where({ id_adocao }).del();
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}