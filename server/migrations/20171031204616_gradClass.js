
exports.up = function(knex, Promise) {

  return knex.schema.createTable('gradClass', function(table){
    table.increments('id')
    table.varchar('class_name')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('gradClass')
};
