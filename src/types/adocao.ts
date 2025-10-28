export interface Adocao {
    id_adocao: number;
    data_solicitacao: Date;
    ong_id?: number;
    animal_id?: number;
    usuario_id?: number;
    status: string;
}