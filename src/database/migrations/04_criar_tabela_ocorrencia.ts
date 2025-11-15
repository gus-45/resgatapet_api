import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Ocorrencia', (table) => {
        table.increments('id_ocorrencia').primary();
        table.string('descricao', 1000).notNullable();
        table.string('localizacao', 500).notNullable();
        table.string('foto_url', 500).notNullable();
        table.string('status', 50).defaultTo('encontrado').notNullable();
        table.timestamp('data_registro').defaultTo(knex.fn.now());

        // Usuario (quem reportou)
        table.integer('usuario_id')
             .unsigned()
             .references('id_usuario')
             .inTable('Usuario')
             .onDelete('SET NULL'); 

        // ONG (quem resgatou)
        table.integer('ong_id')
             .unsigned()
             .references('id_ong')
             .inTable('ONG')
             .onDelete('SET NULL');

        // Animal (se a ocorrência virou um animal registrado)
        table.integer('animal_id')
             .unsigned()
             .references('id_animal')
             .inTable('Animal')
             .onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Ocorrencia');
}