import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('prioridade', (table) => {
        table.increments('id_prioridade').primary();
        table.string('nivel', 100).notNullable(); // Alta, Média, Baixa
        table.string('descricao', 500).notNullable();

        //Animal (animal com prioridade)
        table.integer('animal_id')
             .unsigned()
             .references('id_animal')
             .inTable('Animal')
             .onDelete('CASCADE'); //animal deletado -> prioridade some
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('prioridade');
}