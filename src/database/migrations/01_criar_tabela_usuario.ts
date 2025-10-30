import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Usuario');
}