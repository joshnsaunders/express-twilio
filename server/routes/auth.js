const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get('/auth' ,function(request, response){
  database('auth')
    .then(function(data){
      response.json(data)
    })
})

router.post("/auth", function(req, res, next) {
  console.log(`auth`, req.body.email);
  return database("auth")
    .insert({
      email:req.body.email
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

module.exports = router
