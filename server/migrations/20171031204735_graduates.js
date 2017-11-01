exports.up = function(knex, Promise) {
  return knex.schema.createTable("graduates", function(table) {
    table.increments("id");
    table.varchar('first_name')
    table.varchar('last_name')
    table.varchar('phone_number')
    table.varchar('email')
    table.boolean('opt_in_status')
    table.integer('class_name')
      .references('gradClass.id')
        .onDelete('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('graduates');
};
