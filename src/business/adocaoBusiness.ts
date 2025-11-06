import { AdocaoData } from "../data/adocaoData";
import { Adocao } from "../types/adocao";
import { PaginatedResponse } from "../dto/paginationDto";
import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";
import { FilterUtilsAdocao } from '../utils/filterUtilsAdocao'; 

export class AdocaoBusiness {
    private adocaoData = new AdocaoData(); 

    public async getAllAdocoes(filter: AdocaoFilterDTO): Promise<PaginatedResponse<Adocao>> { 
        try{
            const completeFilter = FilterUtilsAdocao.applyDefaults(filter);
            
            const adocoes = await this.adocaoData.getAllAdocoes(completeFilter); 
            return adocoes;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getAdocaoById(id_adocao: number): Promise<Adocao | undefined> {
        try{
            const adocao = await this.adocaoData.getAdocaoById(id_adocao);
            return adocao;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async createAdocao(input: Omit<Adocao, "id_adocao">): Promise<void> {
        try {
            if (!input.animal_id || !input.usuario_id || !input.status) {
                throw new Error("Campos obrigatórios ausentes (animal_id, usuario_id, status)");
            }

            input.data_solicitacao = new Date();

            await this.adocaoData.createAdocao(input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}