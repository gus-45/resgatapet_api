import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('doacao', (table) => {
        table.increments('id_doacao').primary();
        table.string('tipo', 100).notNullable(); // financeira ou material
        table.decimal('valor', 10, 2); // financeiras
        table.string('descricao', 500); // materiais
        table.timestamp('data_doacao').defaultTo(knex.fn.now());

        //ONG (quem recebe)
        table.integer('ong_id')
             .unsigned()
             .notNullable() // Toda doação TEM que ter uma ONG
             .references('id_ong')
             .inTable('ONG')
             .onDelete('CASCADE');

        //Usuario (quem doou - pode ser nulo/anônimo)
        table.integer('usuario_id')
             .unsigned()
             .references('id_usuario')
             .inTable('Usuario')
             .onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('doacao');
}