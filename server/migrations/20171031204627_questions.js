exports.up = function(knex, Promise) {
  return knex.schema.createTable("questions", function(table) {
    table.increments("id");
    table.varchar("question_text");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
