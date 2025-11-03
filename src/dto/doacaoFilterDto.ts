import { PaginationParams } from './paginationDto'; 

export interface DoacaoFilterDTO extends PaginationParams {
    tipo?: string; 
    ong_id?: number; 
    usuario_id?: number; 
    sortBy?: 'id_doacao' | 'data_doacao' | 'valor'; 
    sortOrder?: 'asc' | 'desc'; 
}