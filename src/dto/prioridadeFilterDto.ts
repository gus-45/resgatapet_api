import { PaginationParams } from './paginationDto'; 

export interface PrioridadeFilterDTO extends PaginationParams {
    nivel?: string; 
    animal_id?: number;
    sortBy?: 'id_prioridade' | 'nivel' | 'descricao'; 
    sortOrder?: 'asc' | 'desc'; 
}