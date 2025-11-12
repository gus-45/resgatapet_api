import { AnimalData } from "../data/animalData";
import { AdocaoData } from "../data/adocaoData";
import { Animal } from "../types/animal";
import { PaginatedResponse } from "../dto/paginationDto";
import { AnimalFilterDTO } from "../dto/animalFilterDto";
import { FilterUtilsAnimal } from "../utils/filterUtilsAnimal";

export class AnimalBusiness {
  private animalData = new AnimalData();

  public async getAllAnimals(filter: AnimalFilterDTO): Promise<PaginatedResponse<Animal>> {
    try {
      const completeFilter = FilterUtilsAnimal.applyAnimalDefaults(filter);
      const animals = await this.animalData.getAllAnimals(completeFilter);
      return animals;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAnimalById(id_animal: number): Promise<Animal | undefined> {
    try {
      const animal = await this.animalData.getAnimalById(id_animal);
      return animal;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createAnimal(
    input: Omit<Animal, "id_animal" | "data_registro">
  ): Promise<Animal> {
    try {
      if (!input.nome || !input.especie || !input.status || !input.ong_id) {
        throw new Error("Campos obrigatórios ausentes: nome, especie, status, ong_id.");
      }

      const animalParaDB = {
        ...input,
        data_registro: new Date(),
      };

      const animalId = await this.animalData.createAnimal(animalParaDB);
      return { ...animalParaDB, id_animal: animalId };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateAnimal(id_animal: number, input: Partial<Animal>): Promise<void> {
    try {
      const animal = await this.animalData.getAnimalById(id_animal);
      if (!animal) {
        throw new Error("Animal não encontrado.");
      }

      await this.animalData.updateAnimal(id_animal, input);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteAnimal(id_animal: number): Promise<void> {
    try {
      const animal = await this.animalData.getAnimalById(id_animal);
      if (!animal) {
        throw new Error("Animal não encontrado.");
      }
      await this.animalData.deleteAnimal(id_animal);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async setPrioridade(
    id_animal: number,
    nivel: string,
    descricao: string
  ): Promise<void> {
    try {
      const animal = await this.animalData.getAnimalById(id_animal);
      if (!animal) {
        throw new Error("Animal não encontrado.");
      }

      throw new Error(
        "A prioridade deve ser definida usando o endpoint de Prioridade. Use o endpoint POST /prioridades com o animal_id."
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}