import { Request, Response } from "express";
import { AdocaoBusiness } from "../business/adocaoBusiness";
import { FilterUtilsAdocao } from '../utils/FilterUtilsAdocao'; 

export class AdocaoController {
    private adocaoBusiness = new AdocaoBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtilsAdocao.applyDefaults(req.query);
            
            const adocoes = await this.adocaoBusiness.getAllAdocoes(filter);
            
            res.status(200).send(adocoes);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

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

    public create = async (req: Request, res: Response) => {
        try {
            const { animal_id, usuario_id, ong_id, status } = req.body;

            await this.adocaoBusiness.createAdocao({
                animal_id,
                usuario_id,
                ong_id,
                status,
                data_solicitacao: new Date(),
            });

            res.status(201).send({ message: "Solicitação de adoção registrada com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    };
}