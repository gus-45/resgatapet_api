import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";
import { OngFilterDTO } from "../dto/ongFilterDto";
import { PrioridadeFilterDTO } from "../dto/prioridadeFilterDto";
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
            name: filter.name ?? "", 
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
            ong_id: filter.ong_id ?? 0,
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

    // --- Lógica para ADOÇÃO ---
    private static readonly DEFAULT_ADOCAO_SORT_BY = 'id_adocao';
    private static readonly DEFAULT_ADOCAO_SORT_ORDER = 'asc';

    static parseAdocaoFilter (query: any): AdocaoFilterDTO {
        return {
            status: query.status as string | undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as 'id_adocao' | 'data_solicitacao' | 'status' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyAdocaoDefaults (filter: AdocaoFilterDTO): Required<AdocaoFilterDTO> {
        return {
            status: filter.status ?? "",
            ong_id: filter.ong_id ?? 0,
            usuario_id: filter.usuario_id ?? 0,
            animal_id: filter.animal_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_ADOCAO_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_ADOCAO_SORT_ORDER
        };
    }

    // --- Lógica para PRIORIDADE ---
    private static readonly DEFAULT_PRIORIDADE_SORT_BY = 'id_prioridade';
    private static readonly DEFAULT_PRIORIDADE_SORT_ORDER = 'asc';

    static parsePrioridadeFilter (query: any): PrioridadeFilterDTO {
        return {
            nivel: query.nivel as string | undefined,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy as 'id_prioridade' | 'nivel' | 'descricao' | undefined,
            sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
        };
    }

    static applyPrioridadeDefaults (filter: PrioridadeFilterDTO): Required<PrioridadeFilterDTO> {
        return {
            nivel: filter.nivel ?? "",
            animal_id: filter.animal_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_PRIORIDADE_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_PRIORIDADE_SORT_ORDER
        };
    }
}