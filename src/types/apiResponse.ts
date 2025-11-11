import { PageInfo } from "../dto/paginationDto"; 

export interface ApiResponse<T = any> {
    success: true; 
    message: string; 
    data?: T;
    total?: number;
    pageInfo?: PageInfo;
}

export interface ErrorResponse {
    success: false;
    message: string;
    errors: string[];
}
