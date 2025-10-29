export interface Animal {
    id_animal: number;
    nome: string;
    especie: string;
    status: string;
    descricao: string;
    localizacao: string;
    data_registro: Date;
    ong_id?: number;
}
