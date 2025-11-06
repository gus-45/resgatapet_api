import { AnimalFilterDTO } from "../dto/animalFilterDto";

export class FilterUtilsAnimal { 
    private static readonly DEFAULT_PAGE = 1;
    private static readonly DEFAULT_LIMIT = 10;
    private static readonly DEFAULT_ANIMAL_SORT_BY = 'id_animal';
    private static readonly DEFAULT_ANIMAL_SORT_ORDER = 'asc';

    static parseAnimalFilter (query: any): AnimalFilterDTO {
        return {
            nome: query.nome as string | undefined,
            especie: query.especie as string | undefined,
            status: query.status as string | undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            sortBy: query.sortBy as 'id_animal' | 'nome' | 'data_registro' | 'status' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyAnimalDefaults (filter: AnimalFilterDTO): Required<AnimalFilterDTO> {
        return {
            nome: filter.nome ?? "",
            especie: filter.especie ?? "",
            status: filter.status ?? "",
            ong_id: filter.ong_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_ANIMAL_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_ANIMAL_SORT_ORDER
        };
    }
}