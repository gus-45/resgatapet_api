"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUtilsOcorrencia = void 0;
class FilterUtilsOcorrencia {
    static parseOcorrenciaFilter(query) {
        return {
            status: query.status,
            localizacao: query.localizacao,
            usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined,
            ong_id: query.ong_id ? Number(query.ong_id) : undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder
        };
    }
    static applyOcorrenciaDefaults(filter) {
        return {
            status: filter.status ?? "",
            localizacao: filter.localizacao ?? "",
            usuario_id: filter.usuario_id ?? 0,
            ong_id: filter.ong_id ?? 0,
            page: filter.page ?? this.DEFAULT_PAGE,
            limit: filter.limit ?? this.DEFAULT_LIMIT,
            sortBy: filter.sortBy ?? this.DEFAULT_OCORRENCIA_SORT_BY,
            sortOrder: filter.sortOrder ?? this.DEFAULT_OCORRENCIA_SORT_ORDER
        };
    }
}
exports.FilterUtilsOcorrencia = FilterUtilsOcorrencia;
FilterUtilsOcorrencia.DEFAULT_PAGE = 1;
FilterUtilsOcorrencia.DEFAULT_LIMIT = 10;
FilterUtilsOcorrencia.DEFAULT_OCORRENCIA_SORT_BY = 'id_ocorrencia';
FilterUtilsOcorrencia.DEFAULT_OCORRENCIA_SORT_ORDER = 'desc';
//# sourceMappingURL=filterUtilsOcorrencia.js.map