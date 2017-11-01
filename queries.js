const knex = require('./server/db/knex.js')

// module.exports= {
  getStudentId: (phoneNumber) => {
    return knex('graduates')
    .select(knex.raw('select "student_id" from "graduates" where "phone_number" = ?', 'phoneNumber'))
    console.log(getStudentId('+15038902873'))
  }

//}
