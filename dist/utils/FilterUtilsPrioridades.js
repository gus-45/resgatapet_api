"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUtilsPrioridades = void 0;
class FilterUtilsPrioridades {
    static parse(query) {
        return {
            nivel: query.nivel,
            animal_id: query.animal_id ? Number(query.animal_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
    }
    static applyDefaults(filter) {
        return {
            nivel: filter.nivel ?? "",
            animal_id: filter.animal_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_SORT_ORDER,
        };
    }
}
exports.FilterUtilsPrioridades = FilterUtilsPrioridades;
FilterUtilsPrioridades.DEFAULT_PAGE = 1;
FilterUtilsPrioridades.DEFAULT_LIMIT = 10;
FilterUtilsPrioridades.DEFAULT_SORT_BY = "id_prioridade";
FilterUtilsPrioridades.DEFAULT_SORT_ORDER = "asc";
//# sourceMappingURL=FilterUtilsPrioridades.js.map