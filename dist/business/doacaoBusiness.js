"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoacaoBusiness = void 0;
const doacaoData_1 = require("../data/doacaoData");
const FilterUtils_1 = require("../utils/FilterUtils");
class DoacaoBusiness {
    constructor() {
        this.doacaoData = new doacaoData_1.DoacaoData();
    }
    async getAllDoacoes(filter) {
        try {
            const completeFilter = FilterUtils_1.FilterUtils.applyDoacaoDefaults(filter);
            const doacoes = await this.doacaoData.getAllDoacoes(completeFilter);
            return doacoes;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getDoacaoById(id_doacao) {
        try {
            const doacao = await this.doacaoData.getDoacaoById(id_doacao);
            return doacao;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.DoacaoBusiness = DoacaoBusiness;
//# sourceMappingURL=doacaoBusiness.js.map