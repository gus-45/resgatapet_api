import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('adocao', (table) => { 
        table.increments('id_adocao').primary();
        table.string('status', 50).notNullable().defaultTo('em análise');
        table.timestamp('data_solicitacao').defaultTo(knex.fn.now());

        //  Usuario (quem quer adotar)
        table.integer('usuario_id')
             .unsigned()
             .references('id_usuario')
             .inTable('Usuario')
             .onDelete('CASCADE'); // usuário  deletado -> solicitação é removida

        //  Animal (animal solicitado)
        table.integer('animal_id')
             .unsigned()
             .references('id_animal')
             .inTable('Animal')
             .onDelete('CASCADE'); // animal deletado -> solicitação é removida

        //  ONG (quem aprova)
        table.integer('ong_id')
             .unsigned()
             .references('id_ong')
             .inTable('ONG')
             .onDelete('CASCADE'); // ONG deletada -> solicitação é removida
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('adocao');
}