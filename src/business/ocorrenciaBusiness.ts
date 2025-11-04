
import { OcorrenciaData } from "../data/ocorrenciaData";
import { Ocorrencia } from "../types/ocorrencia";
import { PaginatedResponse } from "../dto/paginationDto";
import { OcorrenciaFilterDTO } from "../dto/ocorrenciaFilterDto";
import { FilterUtilsOcorrencia } from '../utils/filterUtilsOcorrencia'; 

export class OcorrenciaBusiness {
    private ocorrenciaData = new OcorrenciaData(); 

    public async getAllOcorrencias(filter: OcorrenciaFilterDTO): Promise<PaginatedResponse<Ocorrencia>> { 
        try{
            const completeFilter = FilterUtilsOcorrencia.applyOcorrenciaDefaults(filter);
            const ocorrencias = await this.ocorrenciaData.getAllOcorrencias(completeFilter); 
            return ocorrencias;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getOcorrenciaById(id_ocorrencia: number): Promise<Ocorrencia | undefined> {
        try{
            const ocorrencia = await this.ocorrenciaData.getOcorrenciaById(id_ocorrencia);
            return ocorrencia;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
    public async createOcorrencia(input: Omit<Ocorrencia, "id_ocorrencia" | "data_registro" | "status">): Promise<void> {
        try{
            if (!input.descricao || !input.localizacao || !input.foto_url) {
                throw new Error("Campos obrigatórios ausentes: descricao, localizacao e foto_url.");
            }
            const statusInicial = 'encontrado'; 
            const dataRegistro = new Date();
            const ocorrenciaParaDB = {
                ...input,
                status: statusInicial,
                data_registro: dataRegistro,
            } as Omit<Ocorrencia, "id_ocorrencia">; 
            await this.ocorrenciaData.createOcorrencia(ocorrenciaParaDB);
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}
