const tables = require('../index').tables;
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid('id').primary();

      table.string('email', 255)
        .notNullable();

      table.unique('email', 'idx_place_name_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};