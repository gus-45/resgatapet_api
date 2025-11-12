import { Knex } from "knex";
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export async function seed(knex: Knex): Promise<void> {
    // 1. Apaga os dados e RESETA O CONTADOR DE ID (TRUNCATE RESTART IDENTITY)
    await knex.raw('TRUNCATE "Animal" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE "ONG" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE "Usuario" RESTART IDENTITY CASCADE');

    const hashedPassword = await bcrypt.hash('123456', saltRounds);

    // 1. INSERIR USUÁRIOS (Admin, ONG, Comum)
    const insertedUserIds = await knex('Usuario').insert([
        { nome: 'Admin Master', email: 'admin@resgatapet.com', senha: hashedPassword, tipo: 'ADMIN' },
        { nome: 'ONG Abrigo Feliz', email: 'contato@abrigofeliz.com', senha: hashedPassword, tipo: 'ONG' },
        { nome: 'João Cidadão', email: 'joao@email.com', senha: hashedPassword, tipo: 'COMUM' }
    ], 'id_usuario');

    // Mapeamento que funciona para PostgreSQL e Knex
    const integerUserIds = insertedUserIds.map((item: any) => item.id_usuario || item);
    const [adminId, ongUserId, comumId] = integerUserIds;

    // 2. Inserir ONG, vinculada ao usuário com tipo 'ONG'
    // Garantindo que o retorno seja tratado como array, mas desestruturando-o para pegar o primeiro item
    const insertedOngIds = await knex('ONG').insert([ 
        { 
            nome: 'Abrigo Doce Lar', 
            email: 'doce_lar@email.com', 
            endereco: 'Rua Principal, 456 - Bairro',
            telefone: '31988887777',
            usuario_id: ongUserId 
        }
    ], 'id_ong'); 

    // Extraímos o primeiro ID do array de retorno (que é um objeto {id_ong: 1})
    // E garantimos que ele seja um número
    const ongId = insertedOngIds[0].id_ong || insertedOngIds[0];
    
    // 3. Inserir Animais
    await knex('Animal').insert([
        { nome: 'Rex', especie: 'Cachorro', status: 'resgatado', descricao: 'Pastor Alemão, dócil.', ong_id: ongId }, 
        { nome: 'Miau', especie: 'Gato', status: 'disponivel', descricao: 'Gato Siamês, busca adoção.', ong_id: ongId }, 
        { nome: 'Piu', especie: 'Pássaro', status: 'encontrado', descricao: 'Calopsita perdida.', ong_id: ongId } 
    ]);
}