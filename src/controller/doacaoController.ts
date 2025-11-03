import { Request, Response } from "express";
import { DoacaoBusiness } from "../business/doacaoBusiness";
import { FilterUtils } from '../utils/FilterUtils'; 

export class DoacaoController {
    private doacaoBusiness = new DoacaoBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtils.parseDoacaoFilter(req.query);
            
            const doacoes = await this.doacaoBusiness.getAllDoacoes(filter);
            
            res.status(200).send(doacoes);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da doação é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);

            const doacao = await this.doacaoBusiness.getDoacaoById(idNumber);

            if (!doacao) {
                return res.status(404).json({ error: 'Doação não encontrada' });
            }

            res.status(200).send(doacao); 
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}