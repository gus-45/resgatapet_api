import { PaginationParams } from './paginationDto';

export interface UserFilterDTO extends PaginationParams {
    name?: string;
    email?: string;
    sortBy?: 'id_usuario' | 'nome' | 'email'; 
    sortOrder?: 'asc' | 'desc'; 
}
