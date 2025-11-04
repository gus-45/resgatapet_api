"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioridadeController = void 0;
const prioridadesBusiness_1 = require("../business/prioridadesBusiness");
const FilterUtilsPrioridades_1 = require("../utils/FilterUtilsPrioridades");
class PrioridadeController {
    constructor() {
        this.prioridadeBusiness = new prioridadesBusiness_1.PrioridadeBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = FilterUtilsPrioridades_1.FilterUtilsPrioridades.applyDefaults(req.query);
                const prioridades = await this.prioridadeBusiness.getAllPrioridades(filter);
                res.status(200).send(prioridades);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID da prioridade é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const prioridade = await this.prioridadeBusiness.getPrioridadeById(idNumber);
                if (!prioridade) {
                    return res.status(404).json({ error: 'Prioridade não encontrada' });
                }
                res.status(200).send(prioridade);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.PrioridadeController = PrioridadeController;
//# sourceMappingURL=prioridadesController.js.map