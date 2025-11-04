"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcorrenciaBusiness = void 0;
const ocorrenciaData_1 = require("../data/ocorrenciaData");
const filterUtilsOcorrencia_1 = require("../utils/filterUtilsOcorrencia");
class OcorrenciaBusiness {
    constructor() {
        this.ocorrenciaData = new ocorrenciaData_1.OcorrenciaData();
    }
    async getAllOcorrencias(filter) {
        try {
            const completeFilter = filterUtilsOcorrencia_1.FilterUtilsOcorrencia.applyOcorrenciaDefaults(filter);
            const ocorrencias = await this.ocorrenciaData.getAllOcorrencias(completeFilter);
            return ocorrencias;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getOcorrenciaById(id_ocorrencia) {
        try {
            const ocorrencia = await this.ocorrenciaData.getOcorrenciaById(id_ocorrencia);
            return ocorrencia;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createOcorrencia(input) {
        try {
            if (!input.descricao || !input.localizacao || !input.foto_url) {
                throw new Error("Campos obrigatórios ausentes: descricao, localizacao e foto_url.");
            }
            const statusInicial = 'encontrado';
            const dataRegistro = new Date();
            const ocorrenciaParaDB = {
                ...input,
                status: statusInicial,
                data_registro: dataRegistro,
            };
            await this.ocorrenciaData.createOcorrencia(ocorrenciaParaDB);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.OcorrenciaBusiness = OcorrenciaBusiness;
//# sourceMappingURL=ocorrenciaBusiness.js.map