"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioridadeBusiness = void 0;
const prioridadesData_1 = require("../data/prioridadesData");
const FilterUtilsPrioridades_1 = require("../utils/FilterUtilsPrioridades");
class PrioridadeBusiness {
    constructor() {
        this.prioridadeData = new prioridadesData_1.PrioridadeData();
    }
    async getAllPrioridades(filter) {
        try {
            const completeFilter = FilterUtilsPrioridades_1.FilterUtilsPrioridades.applyDefaults(filter);
            const prioridades = await this.prioridadeData.getAllPrioridades(completeFilter);
            return prioridades;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPrioridadeById(id_prioridade) {
        try {
            const prioridade = await this.prioridadeData.getPrioridadeById(id_prioridade);
            return prioridade;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.PrioridadeBusiness = PrioridadeBusiness;
//# sourceMappingURL=prioridadesBusiness.js.map