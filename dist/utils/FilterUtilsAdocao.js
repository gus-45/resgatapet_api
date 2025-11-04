"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUtilsAdocao = void 0;
class FilterUtilsAdocao {
    static parse(query) {
        return {
            status: query.status,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
    }
    static applyDefaults(filter) {
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
exports.FilterUtilsAdocao = FilterUtilsAdocao;
FilterUtilsAdocao.DEFAULT_PAGE = 1;
FilterUtilsAdocao.DEFAULT_LIMIT = 10;
FilterUtilsAdocao.DEFAULT_SORT_BY = "id_adocao";
FilterUtilsAdocao.DEFAULT_SORT_ORDER = "asc";
//# sourceMappingURL=FilterUtilsAdocao.js.map