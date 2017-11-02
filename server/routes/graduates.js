const express = require('express')
const router = express.Router();
const database = require('../db/knex');


router.get('/', function (request, response){
  console.log('hi')
  .then(function(data){
    response.send(`hi`)
  })
})

// get all grads
router.get('/graduates' ,function(request, response){
  database('graduates')
    .then(function(data){
      response.json(data)
    })
})

// get one grads
router.get('/graduates/:id', function(request, response) {
  database('graduates')
    .where('id', '=', request.params.id)
});

router.post('/graduates/add', function(request, response) {
  database('graduates')
    .insert({ 
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      phone_number: request.body.phone_number,
      email: request.body.email,
      opt_in_status: request.body.opt_in_status,
      class_name: request.body.class_name
    }).returning('*')
    .then(() => {
      response.json('added')
    })
})


module.exports = router
