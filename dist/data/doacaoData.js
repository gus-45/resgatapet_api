"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoacaoData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class DoacaoData {
    async getAllDoacoes(filter) {
        try {
            const { tipo, ong_id, usuario_id, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('doacao').select();
            if (tipo) {
                query = query.where('tipo', 'like', `%${tipo}%`);
            }
            if (ong_id && ong_id > 0) {
                query = query.where('ong_id', ong_id);
            }
            if (usuario_id && usuario_id > 0) {
                query = query.where('usuario_id', usuario_id);
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
    async getDoacaoById(id_doacao) {
        try {
            const doacao = await (0, dbConnection_1.default)('doacao').where({ id_doacao }).first();
            return doacao;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.DoacaoData = DoacaoData;
//# sourceMappingURL=doacaoData.js.map