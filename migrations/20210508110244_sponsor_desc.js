const { onUpdateTrigger } = require('../knexfile');

exports.up = (knex) => knex.schema.createTable("sponsor_desc", table => {
  table.increments('id'); // For SQLite date auto-update trigger.
  table.string("title").notNullable();
  table.string("description", 5000);    // Raw HTML for rich text support.
  table.json("images");

  table.timestamps(true, true); // Add created_at and updated_at columns.
})
.then(() => knex.raw(onUpdateTrigger('sponsor_desc')))

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sponsor_desc")
};
