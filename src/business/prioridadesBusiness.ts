import { PrioridadeData } from "../data/prioridadesData";
import { Prioridade } from "../types/prioridades";
import { PaginatedResponse } from "../dto/paginationDto";
import { PrioridadeFilterDTO } from "../dto/prioridadeFilterDto";
import { FilterUtils } from '../utils/FilterUtils'; 

export class PrioridadeBusiness {
    private prioridadeData = new PrioridadeData(); 

    public async getAllPrioridades(filter: PrioridadeFilterDTO): Promise<PaginatedResponse<Prioridade>> { 
        try{
            const completeFilter = FilterUtils.applyPrioridadeDefaults(filter);
            
            const prioridades = await this.prioridadeData.getAllPrioridades(completeFilter); 
            return prioridades;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getPrioridadeById(id_prioridade: number): Promise<Prioridade | undefined> {
        try{
            const prioridade = await this.prioridadeData.getPrioridadeById(id_prioridade);
            return prioridade;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}