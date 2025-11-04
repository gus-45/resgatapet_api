export interface Ocorrencia {
    id_ocorrencia: number;
    descricao: string;
    localizacao: string;
    foto_url: string; 
    status: string; 
    usuario_id: number;
    ong_id?: number; 
    animal_id?: number; 
    data_registro: Date; 
}