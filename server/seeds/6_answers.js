exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function() {
      // Inserts seed entries
      return knex('answers').insert([{
          id: 1,
          date_updated: 'Jan 20, 2017',
          twilio_body: 'no',
          student_id: 1,
          question_id: 5,
        },
        {
          id: 2,
          date_updated: 'Feb 12, 2016',
          twilio_body: 'yes',
          student_id: 2,
          question_id: 3,
        },
        {
          id: 3,
          date_updated: 'March 29, 2015',
          twilio_body: 'no',
          student_id: 3,
          question_id: 3,
        }
      ]);
    }).then(function(){
      return knex.raw('alter sequence answers_id_seq restart with 4')
    })
};
