import { DoacaoFilterDTO } from "../dto/doacaoFilterDto";

export class FilterUtilsDoacao  {
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_DOACAO_SORT_BY = 'id_doacao';
    private static readonly DEFAULT_DOACAO_SORT_ORDER = 'asc';
    static parseDoacaoFilter (query: any): DoacaoFilterDTO {
        return {
            tipo: query.tipo as string | undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as 'id_doacao' | 'data_doacao' | 'valor' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyDefaults (filter: DoacaoFilterDTO): Required<DoacaoFilterDTO> {
        return {
            tipo: filter.tipo ?? "",
            ong_id: filter.ong_id ?? 0,
            usuario_id: filter.usuario_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_DOACAO_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_DOACAO_SORT_ORDER
        };
    }
}