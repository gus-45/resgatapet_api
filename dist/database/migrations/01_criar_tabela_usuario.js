"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('Usuario', (table) => {
        // Chave primária: id_usuario (auto incrementável)
        table.increments('id_usuario').primary();
        // Campos de autenticação e identificação
        table.string('nome', 255).notNullable();
        table.string('email', 255).notNullable().unique(); // Garante que o email é único (RF09)
        table.string('senha', 255).notNullable(); // Hash da senha (RNF10)
        table.string('tipo', 50).notNullable(); // Ex: 'ADMIN', 'ONG', 'COMUM'
        // Data de criação
        table.timestamp('data_criacao').defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable('Usuario');
}
//# sourceMappingURL=01_criar_tabela_usuario.js.map