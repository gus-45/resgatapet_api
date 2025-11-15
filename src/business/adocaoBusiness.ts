import { AdocaoData } from "../data/adocaoData";
import { Adocao } from "../types/adocao";
import { PaginatedResponse } from "../dto/paginationDto";
import { AdocaoFilterDTO } from "../dto/adocaoFilterDto";
import { FilterUtilsAdocao } from "../utils/filterUtilsAdocao";
import { AnimalData } from "../data/animalData";
import { UserData } from "../data/usuarioData";

export class AdocaoBusiness {
  private adocaoData = new AdocaoData();
  private animalData = new AnimalData();
  private userData = new UserData();

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

  public async createAdocao(input: AdocaoFilterDTO): Promise<void> {
  try {
    const { animal_id, usuario_id, status } = input;

    if (!animal_id || !usuario_id || !status) {
      throw new Error(
        "Campos obrigatórios ausentes (animal_id, usuario_id, status)."
      );
    }

    const animalExiste = await this.animalData.getAnimalById(animal_id);
    if (!animalExiste) {
      throw new Error(`Animal com ID ${animal_id} não encontrado.`);
    }

    const usuarioExiste = await this.userData.getUserById(usuario_id);
    if (!usuarioExiste || usuarioExiste.tipo.toUpperCase() !== "COMUM") {
      throw new Error(
        `Usuário com ID ${usuario_id} não encontrado ou não é um Usuário Comum.`
      );
    }

    const novaAdocao = {
      animal_id,
      usuario_id,
      status,
      data_solicitacao: new Date(),
      ong_id: animalExiste.ong_id,
    };

    await this.adocaoData.createAdocao(novaAdocao);
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
