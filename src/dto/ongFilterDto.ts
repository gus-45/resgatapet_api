import { PaginationParams } from './paginationDto'; 

export interface OngFilterDTO extends PaginationParams {
    nome?: string; 
    cidade?: string; 
    sortBy?: 'id_ong' | 'nome' | 'data_registro'; 
    sortOrder?: 'asc' | 'desc'; 
}