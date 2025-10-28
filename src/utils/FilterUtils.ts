import { OngFilterDTO } from "../dto/ongFilterDto";
import { UserFilterDTO, AnimalFilterDTO } from '../dto/userFilterDto';

export class FilterUtils {
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
            name: filter.name ?? "", // Se for nulo/undefined, usa string vazia
            email: filter.email ?? "",
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER
        };
    }

    // --- Lógica para ANIMAL ---
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
            ong_id: filter.ong_id ?? 0, // 0 é o valor padrão para indicar "sem filtro de ONG"
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_ANIMAL_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_ANIMAL_SORT_ORDER
        };
    }

    // --- Lógica para ONG ---
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