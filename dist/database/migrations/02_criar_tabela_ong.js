"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('ONG', (table) => {
        table.increments('id_ong').primary();
        table.string('nome', 255).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('endereco', 500).notNullable();
        table.string('telefone', 20);
        // Chave estrangeira (FK) para o Admin da ONG (ligando à tabela Usuario)
        table.integer('usuario_id')
            .unsigned() // Deve ser positivo
            .references('id_usuario')
            .inTable('Usuario')
            .onDelete('CASCADE') // Se o usuário Admin for deletado, a ONG é deletada
            .notNullable();
    });
}
async function down(knex) {
    return knex.schema.dropTable('ONG');
}
//# sourceMappingURL=02_criar_tabela_ong.js.map