
import connection from "../dbConnection";
import { Ocorrencia } from "../types/ocorrencia"; 
import { PaginatedResponse } from "../dto/paginationDto"; 
import { OcorrenciaFilterDTO } from "../dto/ocorrenciaFilterDto"; 

export class OcorrenciaData {

    public async getAllOcorrencias(filter: Required<OcorrenciaFilterDTO>): Promise<PaginatedResponse<Ocorrencia>> { 
        try {
            const { status, localizacao, usuario_id, ong_id, page, limit, sortBy, sortOrder } = filter; 

            let query = connection('Ocorrencia').select(); 
            if (status) {
                query = query.where({ status });
            }
            if (localizacao) {
                query = query.where('localizacao', 'like', `\%${localizacao}\%`);
            }
            if (usuario_id && usuario_id > 0) {
                query = query.where({ usuario_id });
            }
            if (ong_id && ong_id > 0) {
                query = query.where({ ong_id });
            }

            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total'); 

            query = query.orderBy(sortBy, sortOrder);

            const offset = (page - 1) * limit; 
            query = query.limit(limit).offset(offset);

            const data = await query;
            const totalPages = Math.ceil(Number(total) / limit); 
            const pagination: PaginatedResponse<Ocorrencia> = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data as Ocorrencia[]
            };

            return pagination; 
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getOcorrenciaById(id_ocorrencia: number): Promise<Ocorrencia | undefined> {
        try {
            const ocorrencia = await connection('Ocorrencia').where({ id_ocorrencia }).first();
            return ocorrencia as Ocorrencia | undefined;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async createOcorrencia(ocorrencia: Omit<Ocorrencia, "id_ocorrencia" | "data_registro">): Promise<void> {
        try {
            await connection("Ocorrencia").insert(ocorrencia);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
