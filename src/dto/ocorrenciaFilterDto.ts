import { PaginationParams } from './paginationDto'; 

export interface OcorrenciaFilterDTO extends PaginationParams {
    status?: string; 
    localizacao?: string;
    usuario_id?: number;
    ong_id?: number;
    sortBy?: 'id_ocorrencia' | 'data_registro' | 'status' | 'localizacao'; 
    sortOrder?: 'asc' | 'desc'; 
}