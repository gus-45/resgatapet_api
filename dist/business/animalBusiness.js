"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalBusiness = void 0;
const animalData_1 = require("../data/animalData");
const FilterUtils_1 = require("../utils/FilterUtils");
class AnimalBusiness {
    constructor() {
        this.animalData = new animalData_1.AnimalData();
    }
    // Busca todos os animais e aplica os defaults do filtro
    async getAllAnimals(filter) {
        try {
            const completeFilter = FilterUtils_1.FilterUtils.applyAnimalDefaults(filter);
            const animals = await this.animalData.getAllAnimals(completeFilter);
            return animals;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    // Busca um animal por ID (sem regras de negócio complexas por enquanto)
    async getAnimalById(id_animal) {
        try {
            const animal = await this.animalData.getAnimalById(id_animal);
            return animal;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AnimalBusiness = AnimalBusiness;
//# sourceMappingURL=animalBusiness.js.map