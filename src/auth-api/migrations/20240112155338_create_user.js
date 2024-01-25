/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary();
    table.string('user_name', 100).notNullable();
    table.string('user_password', 100).notNullable();
    table.enu('user_permission', ['View', 'Edit', 'Admin']).defaultTo('View').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};

