import { Request, Response } from "express";
import { OcorrenciaBusiness } from "../business/ocorrenciaBusiness";
import { FilterUtilsOcorrencia } from '../utils/filterUtilsOcorrencia';
import { ErrorUtils } from '../utils/ErrorUtils';
import { ApiResponse } from '../types/ApiResponse';
import { Ocorrencia } from '../types/ocorrencia';

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
    public create = async (req: Request, res: Response) => {
        try {
            const {
                descricao,
                localizacao,
                foto_url,
                usuario_id
            } = req.body;
            await this.ocorrenciaBusiness.createOcorrencia({
                descricao,
                localizacao,
                foto_url,
                usuario_id: Number(usuario_id)
            });
            res.status(201).send({ message: "Ocorrência registrada com sucesso! A comunidade e ONGs serão notificadas." });
        } catch (error: any) {
            if (error.message.includes("obrigatórios")) {
                return res.status(400).send({ error: error.message });
            }
            res.status(500).send({ error: error.message });
        }
    }
    public updateStatus = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { status, ong_id } = req.body;
            const errorUtils = new ErrorUtils();

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da ocorrência é obrigatório e deve ser um número' });
            }
            if (!status) errorUtils.addError('O novo status é obrigatório.');
            errorUtils.throwIfHasErrors("Dados de atualização inválidos");
            const idNumber = Number(id);
            const ongIdNumber = ong_id ? Number(ong_id) : undefined;

            await this.ocorrenciaBusiness.updateOcorrenciaStatus(idNumber, status, ongIdNumber);
            const response: ApiResponse<null> = {
                success: true,
                message: 'Status da ocorrência atualizado com sucesso!'
            };
            res.status(200).send(response);

        } catch (error: any) {
            if (error.message.includes("não encontrada")) {
                return res.status(404).send({ success: false, message: error.message, errors: [error.message] });
            }
            if (error.message.includes("inválido") || error.message.includes("Dados de atualização inválidos")) {
                return res.status(400).send({ success: false, message: error.message, errors: [error.message] });
            }
            res.status(500).send({ success: false, message: 'Erro interno do servidor', errors: [error.message] });
        }
    };
    public delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID da ocorrência é obrigatório e deve ser um número' });
            }

            const idNumber = Number(id);
            await this.ocorrenciaBusiness.deleteOcorrencia(idNumber);

            res.status(204).send();
        } catch (error: any) {
            if (error.message.includes("não encontrada")) {
                return res.status(404).send({ success: false, message: error.message, errors: [error.message] });
            }
            res.status(500).send({ success: false, message: 'Erro interno do servidor', errors: [error.message] });
        }
    };
}
