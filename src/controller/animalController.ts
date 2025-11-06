import { Request, Response } from "express";
import { AnimalBusiness } from "../business/animalBusiness";
import { FilterUtilsAnimal } from '../utils/filterUtilsAnimal'; 

export class AnimalController {
    private animalBusiness = new AnimalBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtilsAnimal.parseAnimalFilter(req.query);
            
            const animals = await this.animalBusiness.getAllAnimals(filter);
            
            res.status(200).send(animals);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID do animal é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);

            const animal = await this.animalBusiness.getAnimalById(idNumber);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            res.status(200).send(animal); 
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}