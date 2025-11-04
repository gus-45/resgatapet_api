"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdocaoController = void 0;
const adocaoBusiness_1 = require("../business/adocaoBusiness");
const FilterUtilsAdocao_1 = require("../utils/FilterUtilsAdocao");
class AdocaoController {
    constructor() {
        this.adocaoBusiness = new adocaoBusiness_1.AdocaoBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = FilterUtilsAdocao_1.FilterUtilsAdocao.applyDefaults(req.query);
                const adocoes = await this.adocaoBusiness.getAllAdocoes(filter);
                res.status(200).send(adocoes);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID da adoção é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const adocao = await this.adocaoBusiness.getAdocaoById(idNumber);
                if (!adocao) {
                    return res.status(404).json({ error: 'Adoção não encontrada' });
                }
                res.status(200).send(adocao);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.create = async (req, res) => {
            try {
                const { animal_id, usuario_id, ong_id, status } = req.body;
                await this.adocaoBusiness.createAdocao({
                    animal_id,
                    usuario_id,
                    ong_id,
                    status,
                    data_solicitacao: new Date(),
                });
                res.status(201).send({ message: "Solicitação de adoção registrada com sucesso!" });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        };
    }
}
exports.AdocaoController = AdocaoController;
//# sourceMappingURL=adocaoController.js.map