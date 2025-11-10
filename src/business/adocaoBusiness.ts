import { AdocaoData } from "../data/adocaoData";
import { Adocao } from "../types/adocao";
import { PaginatedResponse } from "../dto/paginationDto";
import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";
import { FilterUtilsAdocao } from "../utils/filterUtilsAdocao";

export class AdocaoBusiness {
  private adocaoData = new AdocaoData();

  public async getAllAdocoes(
    filter: AdocaoFilterDTO
  ): Promise<PaginatedResponse<Adocao>> {
    try {
      const completeFilter = FilterUtilsAdocao.applyDefaults(filter);
      const adocoes = await this.adocaoData.getAllAdocoes(completeFilter);
      return adocoes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getAdocaoById(id_adocao: number): Promise<Adocao | undefined> {
    try {
      const adocao = await this.adocaoData.getAdocaoById(id_adocao);
      return adocao;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createAdocao(
    input: Omit<Adocao, "id_adocao">
  ): Promise<void> {
    try {
      if (!input.animal_id || !input.usuario_id || !input.status) {
        throw new Error(
          "Campos obrigatórios ausentes (animal_id, usuario_id, status)."
        );
      }

      input.data_solicitacao = new Date();
      await this.adocaoData.createAdocao(input);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateAdocaoStatus(
    id_adocao: number,
    status: string
  ): Promise<void> {
    try {
      const adocao = await this.adocaoData.getAdocaoById(id_adocao);
      if (!adocao) {
        throw new Error("Solicitação de adoção não encontrada.");
      }

      const statusPermitidos = ["aprovado", "rejeitado", "em análise"];
      if (!statusPermitidos.includes(status)) {
        throw new Error("Status de adoção inválido.");
      }

      await this.adocaoData.updateAdocaoStatus(id_adocao, status);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteAdocao(id_adocao: number): Promise<void> {
    try {
      const adocao = await this.adocaoData.getAdocaoById(id_adocao);
      if (!adocao) {
        throw new Error("Solicitação de adoção não encontrada.");
      }

      await this.adocaoData.deleteAdocao(id_adocao);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
