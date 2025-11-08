import { OngData } from "../data/ongData";
import { Ong } from "../types/ong";
import { PaginatedResponse } from "../dto/paginationDto";
import { OngFilterDTO } from "../dto/ongFilterDto";
import { FilterUtilsOng } from "../utils/filterUtilsOng";

export class OngBusiness {
    private ongData = new OngData();

    public async getAllOngs(filter: OngFilterDTO): Promise<PaginatedResponse<Ong>> {
        try {
            const completeFilter = FilterUtilsOng.applyOngDefaults(filter);
            const ongs = await this.ongData.getAllOngs(completeFilter);
            return ongs;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getOngById(id_ong: number): Promise<Ong | undefined> {
        try {
            const ong = await this.ongData.getOngById(id_ong);
            return ong;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async createOng(input: Omit<Ong, "id_ong">): Promise<Ong> {
        try {
            if (!input.nome || !input.email || !input.endereco || !input.usuario_id) {
                throw new Error("Campos obrigatorios ausentes: nome, email, endereco, usuario_id.");
            }

            const existingOng = await this.ongData.getOngByEmail(input.email);
            if (existingOng) {
                throw new Error("Este email ja esta registrado para outra ONG.");
            }

            const ongId = await this.ongData.createOng(input);
            return { ...input, id_ong: ongId };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateOng(id_ong: number, input: Omit<Ong, "id_ong">): Promise<void> {
        try {
            const ong = await this.ongData.getOngById(id_ong);
            if (!ong) {
                throw new Error("ONG nao encontrada.");
            }

            const existingOng = await this.ongData.getOngByEmail(input.email);
            if (existingOng && existingOng.id_ong !== id_ong) {
                throw new Error("Este email ja esta registrado para outra ONG.");
            }

            await this.ongData.updateOng(id_ong, input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteOng(id_ong: number): Promise<void> {
        try {
            const ong = await this.ongData.getOngById(id_ong);
            if (!ong) {
                throw new Error("ONG nao encontrada.");
            }

            await this.ongData.deleteOng(id_ong);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
