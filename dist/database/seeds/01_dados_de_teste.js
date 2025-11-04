"use strict";
// src/database/seeds/01_dados_de_teste.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcrypt = __importStar(require("bcrypt"));
const saltRounds = 10;
async function seed(knex) {
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
    const integerUserIds = insertedUserIds.map((item) => item.id_usuario || item);
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
//# sourceMappingURL=01_dados_de_teste.js.map