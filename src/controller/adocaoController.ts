import { Request, Response } from "express";
import { AdocaoBusiness } from "../business/adocaoBusiness";
import { FilterUtils } from '../utils/FilterUtils'; 

export class AdocaoController {
    private adocaoBusiness = new AdocaoBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtils.parseAdocaoFilter(req.query);
            
            // Chama a Business
            const adocoes = await this.adocaoBusiness.getAllAdocoes(filter);
            
            res.status(200).send(adocoes);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    // /adocoes/:id - Busca por ID
    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da adoção é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);

            const adocao = await this.adocaoBusiness.getAdocaoById(idNumber);

            if (!adocao) {
                return res.status(404).json({ error: 'Adoção não encontrada' });
            }

            res.status(200).send(adocao); 
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}