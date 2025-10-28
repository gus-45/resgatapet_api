import { PaginationParams } from './paginationDto'; 

export interface AdocaoFilterDTO extends PaginationParams {
    status?: string; 
    ong_id?: number;
    usuario_id?: number;
    animal_id?: number;
    sortBy?: 'id_adocao' | 'data_solicitacao' | 'status'; 
    sortOrder?: 'asc' | 'desc'; 
}