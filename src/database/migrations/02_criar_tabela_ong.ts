import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('ONG');
}