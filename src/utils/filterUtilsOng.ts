import { OngFilterDTO } from "../dto/ongFilterDto";

export class FilterUtilsOng { 
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_ONG_SORT_BY = 'id_ong';
    private static readonly DEFAULT_ONG_SORT_ORDER = 'asc';

    static parseOngFilter (query: any): OngFilterDTO {
        return {
            nome: query.nome as string | undefined,
            cidade: query.cidade as string | undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as 'id_ong' | 'nome' | 'data_registro' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyOngDefaults (filter: OngFilterDTO): Required<OngFilterDTO> {
        return {
            nome: filter.nome ?? "",
            cidade: filter.cidade ?? "",
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_ONG_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_ONG_SORT_ORDER
        };
    }
}