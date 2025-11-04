"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdocaoBusiness = void 0;
const adocaoData_1 = require("../data/adocaoData");
const FilterUtilsAdocao_1 = require("../utils/FilterUtilsAdocao");
class AdocaoBusiness {
    constructor() {
        this.adocaoData = new adocaoData_1.AdocaoData();
    }
    async getAllAdocoes(filter) {
        try {
            const completeFilter = FilterUtilsAdocao_1.FilterUtilsAdocao.applyDefaults(filter);
            const adocoes = await this.adocaoData.getAllAdocoes(completeFilter);
            return adocoes;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAdocaoById(id_adocao) {
        try {
            const adocao = await this.adocaoData.getAdocaoById(id_adocao);
            return adocao;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createAdocao(input) {
        try {
            if (!input.animal_id || !input.usuario_id || !input.status) {
                throw new Error("Campos obrigatórios ausentes (animal_id, usuario_id, status)");
            }
            input.data_solicitacao = new Date();
            await this.adocaoData.createAdocao(input);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AdocaoBusiness = AdocaoBusiness;
//# sourceMappingURL=adocaoBusiness.js.map