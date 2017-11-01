
exports.up = function(knex, Promise) {

  return knex.schema.createTable('answers', function(table){
    table.increments('id')
    table.varchar('date_updated')
    table.varchar('twilio_body')
    table.integer('student_id')
      .references('graduates.id')
        .onDelete('CASCADE')
    table.integer('question_id')
      .references('questions.id')
        .onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('answers');
};
