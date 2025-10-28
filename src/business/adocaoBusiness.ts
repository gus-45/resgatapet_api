import { AdocaoData } from "../data/adocaoData";
import { Adocao } from "../types/adocao";
import { PaginatedResponse } from "../dto/paginationDto";
import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";
import { FilterUtils } from '../utils/FilterUtils'; 

export class AdocaoBusiness {
    private adocaoData = new AdocaoData(); 

    public async getAllAdocoes(filter: AdocaoFilterDTO): Promise<PaginatedResponse<Adocao>> { 
        try{
            const completeFilter = FilterUtils.applyAdocaoDefaults(filter);
            
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
}