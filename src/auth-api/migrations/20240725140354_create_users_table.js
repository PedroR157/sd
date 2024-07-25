exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('permission').notNullable();
    });
  };

exports.down = function(knex) {
  return knex.schema.dropTable('users');};
