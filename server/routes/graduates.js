const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get('/graduates' ,function(request, response){
  database('graduates')
    .then(function(data){
      response.json(data)
    })
})

module.exports = router

router.get('/', function (request, response){
  console.log('hi');
  .then(function(data){
    response.send(`hi`)
  })
})
