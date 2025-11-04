"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioridadeData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class PrioridadeData {
    async getAllPrioridades(filter) {
        try {
            const { nivel, animal_id, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('prioridade').select();
            if (nivel) {
                query = query.where('nivel', 'like', `%${nivel}%`);
            }
            if (animal_id && animal_id > 0) {
                query = query.where('animal_id', animal_id);
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
    // Busca uma prioridade por ID
    async getPrioridadeById(id_prioridade) {
        try {
            const prioridade = await (0, dbConnection_1.default)('prioridade').where({ id_prioridade }).first();
            return prioridade;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.PrioridadeData = PrioridadeData;
//# sourceMappingURL=prioridadesData.js.map