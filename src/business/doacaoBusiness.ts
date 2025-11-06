import { DoacaoData } from "../data/doacaoData";
import { Doacao } from "../types/doacao";
import { PaginatedResponse } from "../dto/paginationDto";
import { DoacaoFilterDTO } from "../dto/doacaoFilterDto";
import { FilterUtilsDoacao } from '../utils/filterUtilsDoacao'; 

export class DoacaoBusiness {
    private doacaoData = new DoacaoData(); 

    public async getAllDoacoes(filter: DoacaoFilterDTO): Promise<PaginatedResponse<Doacao>> { 
        try{
            const completeFilter = FilterUtilsDoacao.applyDefaults(filter);
            
            const doacoes = await this.doacaoData.getAllDoacoes(completeFilter); 
            return doacoes;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getDoacaoById(id_doacao: number): Promise<Doacao | undefined> {
        try{
            const doacao = await this.doacaoData.getDoacaoById(id_doacao);
            return doacao;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}