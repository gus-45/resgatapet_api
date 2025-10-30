// src/database/seeds/01_dados_de_teste.ts

import { Knex } from "knex";
import * as bcrypt from 'bcrypt'; 

const saltRounds = 10; 

export async function seed(knex: Knex): Promise<void> {
    // 1. Apaga os dados para evitar duplicidade em execuções repetidas
    await knex('Animal').del();
    await knex('ONG').del();
    await knex('Usuario').del();

    const hashedPassword = await bcrypt.hash('123456', saltRounds);

    // 1. INSERIR USUÁRIOS (Admin, ONG, Comum)
    const insertedUserIds = await knex('Usuario').insert([
        { nome: 'Admin Master', email: 'admin@resgatapet.com', senha: hashedPassword, tipo: 'ADMIN' },
        { nome: 'ONG Abrigo Feliz', email: 'contato@abrigofeliz.com', senha: hashedPassword, tipo: 'ONG' },
        { nome: 'João Cidadão', email: 'joao@email.com', senha: hashedPassword, tipo: 'COMUM' }
    ], 'id_usuario'); 

    // CORREÇÃO: Mapeia o retorno para garantir que temos apenas os números inteiros do ID.
    const integerUserIds = insertedUserIds.map((item: any) => item.id_usuario || item); 

    const [adminId, ongUserId, comumId] = integerUserIds; // Agora, ongUserId é o número inteiro 2

    // 2. Inserir ONG, vinculada ao usuário com tipo 'ONG'
    await knex('ONG').insert([
        { 
            nome: 'Abrigo Doce Lar', 
            email: 'doce_lar@email.com', 
            endereco: 'Rua Principal, 456 - Bairro',
            telefone: '31988887777',
            usuario_id: ongUserId // <--- Recebeu o número 2, e não o objeto
        }
    ]);

    // 3. Inserir Animais
    await knex('Animal').insert([
        { nome: 'Rex', especie: 'Cachorro', status: 'resgatado', descricao: 'Pastor Alemão, dócil.', ong_id: 1 },
        { nome: 'Miau', especie: 'Gato', status: 'disponivel', descricao: 'Gato Siamês, busca adoção.', ong_id: 1 },
        { nome: 'Piu', especie: 'Pássaro', status: 'encontrado', descricao: 'Calopsita perdida.', ong_id: 1 }
    ]);
}