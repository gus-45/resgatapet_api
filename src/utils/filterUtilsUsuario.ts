import { UserFilterDTO} from '../dto/userFilterDto';

export class FilterUtilsUsuario {
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_SORT_BY = 'id_usuario'; 
    private static readonly DEFAULT_SORT_ORDER = 'asc';

    static parseUserFilter (query: any): UserFilterDTO {
        return {
            name: query.name as string | undefined,
            email: query.email as string | undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as 'id_usuario' | 'nome' | 'email' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyUserDefaults (filter: UserFilterDTO): Required<UserFilterDTO> {
        return {
            name: filter.name ?? "", 
            email: filter.email ?? "",
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER
        };
    }
}