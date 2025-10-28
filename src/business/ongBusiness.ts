import { OngData } from "../data/ongData";
import { Ong } from "../types/ong";
import { PaginatedResponse } from "../dto/paginationDto";
import { OngFilterDTO } from "../dto/ongFilterDto";
import { FilterUtils } from '../utils/FilterUtils'; 

export class OngBusiness {
    private ongData = new OngData(); 

    public async getAllOngs(filter: OngFilterDTO): Promise<PaginatedResponse<Ong>> { 
        try{
            const completeFilter = FilterUtils.applyOngDefaults(filter);
            
            const ongs = await this.ongData.getAllOngs(completeFilter); 
            return ongs;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async getOngById(id_ong: number): Promise<Ong | undefined> {
        try{
            const ong = await this.ongData.getOngById(id_ong);
            return ong;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}