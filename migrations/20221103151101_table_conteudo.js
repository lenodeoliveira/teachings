/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('conteudo', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('body').notNull()
     })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('conteudo')
};
