"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalData = void 0;
const dbConnection_1 = __importDefault(require("../dbConnection"));
class AnimalData {
    async getAllAnimals(filter) {
        try {
            const { nome, especie, status, ong_id, page, limit, sortBy, sortOrder } = filter;
            let query = (0, dbConnection_1.default)('Animal').select();
            if (nome) {
                query = query.where('nome', 'like', `\%${nome}\%`);
            }
            if (especie) {
                query = query.where({ especie });
            }
            if (status) {
                query = query.where({ status });
            }
            if (ong_id && ong_id !== 0) {
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
    // Método para buscar um animal por ID
    async getAnimalById(id_animal) {
        try {
            const animal = await (0, dbConnection_1.default)('Animal').where({ id_animal }).first();
            return animal;
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
exports.AnimalData = AnimalData;
//# sourceMappingURL=animalData.js.map