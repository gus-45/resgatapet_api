import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Animal', (table) => {
        table.increments('id_animal').primary();
        table.string('nome', 255).notNullable();
        table.string('especie', 50).notNullable();
        table.string('status', 50).defaultTo('encontrado').notNullable(); // Status inicial
        table.string('descricao', 1000);
        table.string('localizacao', 500);
        table.timestamp('data_registro').defaultTo(knex.fn.now());
        
        // FK para a ONG responsável pelo resgate
        table.integer('ong_id')
             .unsigned()
             .references('id_ong')
             .inTable('ONG')
             .onDelete('SET NULL'); // Se a ONG for deletada, o animal fica sem vínculo
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Animal');
}