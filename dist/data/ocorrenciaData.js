"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcorrenciaData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class OcorrenciaData {
    async getAllOcorrencias(filter) {
        try {
            const { status, localizacao, usuario_id, ong_id, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('Ocorrencia').select();
            if (status) {
                query = query.where({ status });
            }
            if (localizacao) {
                query = query.where('localizacao', 'like', `\%${localizacao}\%`);
            }
            if (usuario_id && usuario_id > 0) {
                query = query.where({ usuario_id });
            }
            if (ong_id && ong_id > 0) {
                query = query.where({ ong_id });
            }
            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total');
            query = query.orderBy(sortBy, sortOrder);
            const offset = (page - 1) * limit;
            query = query.limit(limit).offset(offset);
            const data = await query;
            const totalPages = Math.ceil(Number(total) / limit);
            const pagination = {
                pageInfo: {
                    total: Number(total),
                    limit: limit,
                    page: page,
                    totalPages: totalPages
                },
                data: data
            };
            return pagination;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async getOcorrenciaById(id_ocorrencia) {
        try {
            const ocorrencia = await (0, dbConnection_1.default)('Ocorrencia').where({ id_ocorrencia }).first();
            return ocorrencia;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async createOcorrencia(ocorrencia) {
        try {
            await (0, dbConnection_1.default)("Ocorrencia").insert(ocorrencia);
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.OcorrenciaData = OcorrenciaData;
//# sourceMappingURL=ocorrenciaData.js.map