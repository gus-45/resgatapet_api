"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcorrenciaController = void 0;
const ocorrenciaBusiness_1 = require("../business/ocorrenciaBusiness");
const filterUtilsOcorrencia_1 = require("../utils/filterUtilsOcorrencia");
class OcorrenciaController {
    constructor() {
        this.ocorrenciaBusiness = new ocorrenciaBusiness_1.OcorrenciaBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = filterUtilsOcorrencia_1.FilterUtilsOcorrencia.parseOcorrenciaFilter(req.query);
                const ocorrencias = await this.ocorrenciaBusiness.getAllOcorrencias(filter);
                res.status(200).send(ocorrencias);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID da ocorrência é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const ocorrencia = await this.ocorrenciaBusiness.getOcorrenciaById(idNumber);
                if (!ocorrencia) {
                    return res.status(404).json({ error: 'Ocorrência não encontrada' });
                }
                res.status(200).send(ocorrencia);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.create = async (req, res) => {
            try {
                const { descricao, localizacao, foto_url, usuario_id } = req.body;
                await this.ocorrenciaBusiness.createOcorrencia({
                    descricao,
                    localizacao,
                    foto_url,
                    usuario_id: usuario_id || 0
                });
                res.status(201).send({ message: "Ocorrência registrada com sucesso! A comunidade e ONGs serão notificadas." });
            }
            catch (error) {
                if (error.message.includes("obrigatórios")) {
                    return res.status(400).send({ error: error.message });
                }
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.OcorrenciaController = OcorrenciaController;
//# sourceMappingURL=ocorrenciaController.js.map