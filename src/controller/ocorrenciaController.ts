// src/controller/ocorrenciaController.ts
import { Request, Response } from "express";
import { OcorrenciaBusiness } from "../business/ocorrenciaBusiness";
import { FilterUtilsOcorrencia } from '../utils/filterUtilsOcorrencia'; 

export class OcorrenciaController {
    private ocorrenciaBusiness = new OcorrenciaBusiness();
    public getAll = async (req: Request, res: Response) => {
        try {
            const filter = FilterUtilsOcorrencia.parseOcorrenciaFilter(req.query);
            const ocorrencias = await this.ocorrenciaBusiness.getAllOcorrencias(filter);
            res.status(200).send(ocorrencias);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da ocorrência é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);
            const ocorrencia = await this.ocorrenciaBusiness.getOcorrenciaById(idNumber);
            if (!ocorrencia) {
                return res.status(404).json({ error: 'Ocorrência não encontrada' });
            }
            res.status(200).send(ocorrencia); 
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}