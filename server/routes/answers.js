const express = require('express')
const router = express.Router();
const database = require('../db/knex')

router.get("/answers", function(request, response) {
  database("answers").then(function(data) {
    response.json(data);
  });
});

router.post("/q1Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      question_id: 1,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

module.exports = router;
