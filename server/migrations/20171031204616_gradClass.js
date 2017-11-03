
exports.up = function(knex, Promise) {

  return knex.schema.createTable('grad_class', function(table){
    table.increments('id').primary()
    table.varchar('class_name')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('grad_class')
};
