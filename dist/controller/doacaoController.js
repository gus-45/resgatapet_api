"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoacaoController = void 0;
const doacaoBusiness_1 = require("../business/doacaoBusiness");
const FilterUtils_1 = require("../utils/FilterUtils");
class DoacaoController {
    constructor() {
        this.doacaoBusiness = new doacaoBusiness_1.DoacaoBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = FilterUtils_1.FilterUtils.parseDoacaoFilter(req.query);
                const doacoes = await this.doacaoBusiness.getAllDoacoes(filter);
                res.status(200).send(doacoes);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID da doação é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const doacao = await this.doacaoBusiness.getDoacaoById(idNumber);
                if (!doacao) {
                    return res.status(404).json({ error: 'Doação não encontrada' });
                }
                res.status(200).send(doacao);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.DoacaoController = DoacaoController;
//# sourceMappingURL=doacaoController.js.map