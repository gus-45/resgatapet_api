"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalController = void 0;
const animalBusiness_1 = require("../business/animalBusiness");
const FilterUtils_1 = require("../utils/FilterUtils");
class AnimalController {
    constructor() {
        this.animalBusiness = new animalBusiness_1.AnimalBusiness();
        this.getAll = async (req, res) => {
            try {
                //  Pega os query params filtros, paginação, ordenação
                const filter = FilterUtils_1.FilterUtils.parseAnimalFilter(req.query);
                //  Chama a Business
                const animals = await this.animalBusiness.getAllAnimals(filter);
                res.status(200).send(animals);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
        // Busca por ID
        this.getById = async (req, res) => {
            try {
                const id = req.params.id;
                // Validação: o ID precisa existir e ser um número
                if (!id || isNaN(Number(id))) {
                    return res.status(400).json({ error: 'ID do animal é obrigatório e deve ser um número' });
                }
                const idNumber = Number(id);
                // Chama a Business
                const animal = await this.animalBusiness.getAnimalById(idNumber);
                if (!animal) {
                    return res.status(404).json({ error: 'Animal não encontrado' });
                }
                res.status(200).send(animal);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        };
    }
}
exports.AnimalController = AnimalController;
//# sourceMappingURL=animalController.js.map