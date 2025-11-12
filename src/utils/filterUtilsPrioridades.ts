import { PrioridadeFilterDTO } from "../dto/prioridadeFilterDto";

export class FilterUtilsPrioridades {
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_SORT_BY = "id_prioridade";
    private static readonly DEFAULT_SORT_ORDER = "asc";

    static parse(query: any): PrioridadeFilterDTO {
        return {
            nivel: query.nivel as string | undefined,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined, // Corrigido
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as "id_prioridade" | "nivel" | "descricao" | undefined,
            sortOrder: query.sortOrder as "asc" | "desc" | undefined,
        };
    }

    static applyDefaults(filter: PrioridadeFilterDTO): Required<PrioridadeFilterDTO> {
        return {
            nivel: filter.nivel ?? "",
            animal_id: filter.animal_id ?? undefined,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER,
        } as Required<PrioridadeFilterDTO>;
    }
}