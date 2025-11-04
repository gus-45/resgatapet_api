"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUtils = void 0;
class FilterUtils {
    static parseUserFilter(query) {
        return {
            name: query.name,
            email: query.email,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder
        };
    }
    static applyUserDefaults(filter) {
        return {
            name: filter.name ?? "",
            email: filter.email ?? "",
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER
        };
    }
    static parseAnimalFilter(query) {
        return {
            nome: query.nome,
            especie: query.especie,
            status: query.status,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder
        };
    }
    static applyAnimalDefaults(filter) {
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
    static parseOngFilter(query) {
        return {
            nome: query.nome,
            cidade: query.cidade,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder
        };
    }
    static applyOngDefaults(filter) {
        return {
            nome: filter.nome ?? "",
            cidade: filter.cidade ?? "",
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_ONG_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_ONG_SORT_ORDER
        };
    }
    static parseDoacaoFilter(query) {
        return {
            tipo: query.tipo,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder
        };
    }
    static applyDoacaoDefaults(filter) {
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
exports.FilterUtils = FilterUtils;
FilterUtils.DEFAULT_PAGE = 1;
FilterUtils.DEFAULT_LIMIT = 10;
FilterUtils.DEFAULT_SORT_BY = 'id_usuario';
FilterUtils.DEFAULT_SORT_ORDER = 'asc';
// Lógica para ANIMAL 
FilterUtils.DEFAULT_ANIMAL_SORT_BY = 'id_animal';
FilterUtils.DEFAULT_ANIMAL_SORT_ORDER = 'asc';
// Lógica para ONG 
FilterUtils.DEFAULT_ONG_SORT_BY = 'id_ong';
FilterUtils.DEFAULT_ONG_SORT_ORDER = 'asc';
// Lógica para DOAÇÃO 
FilterUtils.DEFAULT_DOACAO_SORT_BY = 'id_doacao';
FilterUtils.DEFAULT_DOACAO_SORT_ORDER = 'asc';
//# sourceMappingURL=FilterUtils.js.map