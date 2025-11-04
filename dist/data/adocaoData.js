"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdocaoData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class AdocaoData {
    async getAllAdocoes(filter) {
        try {
            const { status, ong_id, usuario_id, animal_id, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('adocao').select();
            if (status) {
                query = query.where('status', 'like', `%${status}%`);
            }
            if (ong_id && ong_id > 0) {
                query = query.where('ong_id', ong_id);
            }
            if (usuario_id && usuario_id > 0) {
                query = query.where('usuario_id', usuario_id);
            }
            if (animal_id && animal_id > 0) {
                query = query.where('animal_id', animal_id);
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
    async getAdocaoById(id_adocao) {
        try {
            const adocao = await (0, dbConnection_1.default)('adocao').where({ id_adocao }).first();
            return adocao;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async createAdocao(adocao) {
        try {
            await (0, dbConnection_1.default)("Adocao").insert(adocao);
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.AdocaoData = AdocaoData;
//# sourceMappingURL=adocaoData.js.map