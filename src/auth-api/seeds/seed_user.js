/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *  
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {user_id: 1, user_name: 'pspspsps', user_password: bcrypt.hashSync('numteintere55@', 10), user_permission: 'View'},
    {user_id: 2, user_name: 'catatonico', user_password: bcrypt.hashSync('m0rr10nt3m', 10), user_permission: 'Edit'},
    {user_id: 3, user_name: 'estroncio', user_password: bcrypt.hashSync('m3t4nf3t4m1n4' , 10), user_permission: 'Admin'},
  ]);
};