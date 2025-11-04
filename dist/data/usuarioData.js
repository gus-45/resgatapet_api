"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class UserData {
    async getAllUsers(filter) {
        try {
            const { name, email, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('Usuario').select();
            if (name) {
                query = query.where('nome', 'like', `\%${name}\%`);
            }
            if (email) {
                query = query.where('email', 'like', `\%${email}\%`);
            }
            // ClonaPra pegar o TOTAL de itens
            const countQuery = query.clone();
            const [{ total }] = await countQuery.count('* as total'); //
            query = query.orderBy(sortBy, sortOrder);
            //  Paginação (LIMIT e OFFSET)
            const offset = (page - 1) * limit;
            query = query.limit(limit).offset(offset);
            const data = await query;
            const totalPages = Math.ceil(Number(total) / limit); // Calcula total de páginas
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
    async getUserById(id_usuario) {
        try {
            const user = await (0, dbConnection_1.default)('Usuario').where({ id_usuario }).first();
            return user;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.UserData = UserData;
//# sourceMappingURL=usuarioData.js.map