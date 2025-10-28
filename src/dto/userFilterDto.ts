import { PaginationParams } from './paginationDto';

export interface UserFilterDTO extends PaginationParams {
    name?: string;
    email?: string;
    sortBy?: 'id_usuario' | 'nome' | 'email'; // Campos permitidos para ordenação
    sortOrder?: 'asc' | 'desc'; // Ordem: crescente ou decrescente
}

export interface AnimalFilterDTO extends PaginationParams {
    nome?: string; 
    especie?: string; 
    status?: string; // Filtro por igualdade para status (encontrado, resgatado, adotado)
    ong_id?: number; 
    sortBy?: 'id_animal' | 'nome' | 'data_registro' | 'status'; // Campos permitidos
    sortOrder?: 'asc' | 'desc'; 
}