import { OcorrenciaFilterDTO } from "../dto/ocorrenciaFilterDto";
export class FilterUtilsOcorrencia  {
 private static readonly DEFAULT_PAGE = 1;
private static readonly DEFAULT_LIMIT = 10;
private static readonly DEFAULT_OCORRENCIA_SORT_BY = 'id_ocorrencia';
private static readonly DEFAULT_OCORRENCIA_SORT_ORDER = 'desc'; 
}
static parseOcorrenciaFilter (query: any): OcorrenciaFilterDTO {
    return {
        status: query.status as string | undefined, 
        localizacao: query.localizacao as string | undefined,
        usuario_id: query.usuario_id ? Number(query.usuario_id) : undefined, 
        ong_id: query.ong_id ? Number(query.ong_id) : undefined,
        page: query.page ? Number(query.page) : undefined,
        limit: query.limit ? Number(query.limit) : undefined, 
        sortBy: query.sortBy as 'id_ocorrencia' | 'data_registro' | 'status' | 'localizacao' | undefined,
        sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
    };
}

static applyOcorrenciaDefaults (filter: OcorrenciaFilterDTO): Required<OcorrenciaFilterDTO> {
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
