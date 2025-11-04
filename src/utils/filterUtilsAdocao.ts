import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";

export class FilterUtilsAdocao  {
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_SORT_BY = "id_adocao";
    private static readonly DEFAULT_SORT_ORDER = "asc";

    static parse(query: any): AdocaoFilterDTO {
        return {
            status: query.status as string | undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as "id_adocao" | "data_solicitacao" | "status" | undefined,
            sortOrder: query.sortOrder as "asc" | "desc" | undefined,
        };
    }

    static applyDefaults(filter: AdocaoFilterDTO): Required<AdocaoFilterDTO> {
        return {
            status: filter.status ?? "",
            ong_id: filter.ong_id ?? 0,
            usuario_id: filter.usuario_id ?? 0,
            animal_id: filter.animal_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER,
        };
    }
}
