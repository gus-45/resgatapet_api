"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const usuarioBusiness_1 = require("../business/usuarioBusiness");
const FilterUtils_1 = require("../utils/FilterUtils");
class UserController {
    constructor() {
        this.userBusiness = new usuarioBusiness_1.UserBusiness();
        this.getAll = async (req, res) => {
            try {
                const filter = FilterUtils_1.FilterUtils.parseUserFilter(req.query);
                const users = await this.userBusiness.getAllUsers(filter);
                res.status(200).send(users);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID do usuário é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                const user = await this.userBusiness.getUserById(idNumber);
                if (!user) {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }
                res.status(200).send(user);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=usuarioController.js.map