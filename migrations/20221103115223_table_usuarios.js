
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table => {
     table.increments('id').primary()
     table.string('nome').notNull()
     table.string('email').notNull().unique()
     table.string('senha').notNull()
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('usuarios')
};
