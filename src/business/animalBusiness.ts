import { AnimalData } from "../data/animalData";
import { Animal } from "../types/animal";
import { PaginatedResponse } from "../dto/paginationDto";
import { AnimalFilterDTO } from "../dto/animalFilterDto";
import { FilterUtilsAnimal } from '../utils/filterUtilsAnimal'; 

export class AnimalBusiness {
    private animalData = new AnimalData(); 

    public async getAllAnimals(filter: AnimalFilterDTO): Promise<PaginatedResponse<Animal>> { 
        try{
            const completeFilter = FilterUtilsAnimal.applyAnimalDefaults(filter);
            
            const animals = await this.animalData.getAllAnimals(completeFilter); 
            return animals;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getAnimalById(id_animal: number): Promise<Animal | undefined> {
        try{
            const animal = await this.animalData.getAnimalById(id_animal);
            return animal;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}