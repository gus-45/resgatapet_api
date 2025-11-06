import { Request, Response } from "express";
import { OngBusiness } from "../business/ongBusiness";
import { FilterUtilsOng } from '../utils/filterUtilsOng'; 

export class OngController {
    private ongBusiness = new OngBusiness();

    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtilsOng.parseOngFilter(req.query);
            
            //  Chama a Business
            const ongs = await this.ongBusiness.getAllOngs(filter);
            
            res.status(200).send(ongs);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    //  /ongs/:id Busca por ID
    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da ONG é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);

            const ong = await this.ongBusiness.getOngById(idNumber);

            if (!ong) {
                return res.status(404).json({ error: 'ONG não encontrada' });
            }

            res.status(200).send(ong); 
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}