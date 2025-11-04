"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OngData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class OngData {
    async getAllOngs(filter) {
        try {
            const { nome, cidade, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('ONG').select();
            if (nome) {
                query = query.where('nome', 'like', `\%${nome}\%`);
            }
            if (cidade) {
                query = query.where('cidade', 'like', `\%${cidade}\%`);
            }
            // Contagem Total 
            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total');
            query = query.orderBy(sortBy, sortOrder);
            const offset = (page - 1) * limit;
            query = query.limit(limit).offset(offset);
            const data = await query;
            // Montar o objeto de resposta paginada
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
    // Busca uma ONG por ID
    async getOngById(id_ong) {
        try {
            const ong = await (0, dbConnection_1.default)('ONG').where({ id_ong }).first();
            return ong;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.OngData = OngData;
//# sourceMappingURL=ongData.js.map