import { PaginationParams } from "./paginationDto";

export interface AnimalFilterDTO extends PaginationParams {
    nome?: string; 
    especie?: string; 
    status?: string; 
    ong_id?: number; 
    sortBy?: 'id_animal' | 'nome' | 'data_registro' | 'status'; 
    sortOrder?: 'asc' | 'desc'; 
}