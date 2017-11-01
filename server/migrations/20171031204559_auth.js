
exports.up = function(knex, Promise) {

  return knex.schema.createTable('auth', function(table){
    table.increments('id')
    table.varchar('email')
    table.varchar('hash')
  })


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('auth')
};
