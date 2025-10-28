import { AnimalData } from "../data/animalData";
import { Animal } from "../types/animal";
import { PaginatedResponse } from "../dto/paginationDto";
import { AnimalFilterDTO } from "../dto/userFilterDto";
import { FilterUtils } from '../utils/FilterUtils'; 

export class AnimalBusiness {
    private animalData = new AnimalData(); 

    // Busca todos os animais e aplica os defaults do filtro
    public async getAllAnimals(filter: AnimalFilterDTO): Promise<PaginatedResponse<Animal>> { 
        try{
            const completeFilter = FilterUtils.applyAnimalDefaults(filter);
            
            const animals = await this.animalData.getAllAnimals(completeFilter); 
            return animals;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    // Busca um animal por ID (sem regras de negócio complexas por enquanto)
    public async getAnimalById(id_animal: number): Promise<Animal | undefined> {
        try{
            const animal = await this.animalData.getAnimalById(id_animal);
            return animal;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}