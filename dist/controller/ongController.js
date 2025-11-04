"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OngController = void 0;
const ongBusiness_1 = require("../business/ongBusiness");
const FilterUtils_1 = require("../utils/FilterUtils");
class OngController {
    constructor() {
        this.ongBusiness = new ongBusiness_1.OngBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = FilterUtils_1.FilterUtils.parseOngFilter(req.query);
                //  Chama a Business
                const ongs = await this.ongBusiness.getAllOngs(filter);
                res.status(200).send(ongs);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        //  /ongs/:id Busca por ID
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID da ONG é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const ong = await this.ongBusiness.getOngById(idNumber);
                if (!ong) {
                    return res.status(404).json({ error: 'ONG não encontrada' });
                }
                res.status(200).send(ong);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.OngController = OngController;
//# sourceMappingURL=ongController.js.map