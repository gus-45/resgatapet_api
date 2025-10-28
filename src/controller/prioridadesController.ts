import { Request, Response } from "express";
import { PrioridadeBusiness } from "../business/prioridadesBusiness";
import { FilterUtils } from '../utils/FilterUtils'; 

export class PrioridadeController {
    private prioridadeBusiness = new PrioridadeBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtils.parsePrioridadeFilter(req.query);
            
            // Chama a Business
            const prioridades = await this.prioridadeBusiness.getAllPrioridades(filter);
            
            res.status(200).send(prioridades);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    // /prioridades/:id - Busca por ID
    public getById = async (req: Request, res: Response) => {
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
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}