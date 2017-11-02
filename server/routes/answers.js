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
      date_updated: new Date(),
      question_id: 1,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q2Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 2,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q3Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 3,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q4Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 4,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q5Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 5,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q6Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 6,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q7Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 7,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});

router.post("/q8Answers", function(req, res, next) {
  console.log(`lne 61`, req.body.data[0].id);
  return database("answers")
    .insert({
      date_updated: new Date(),
      question_id: 8,
      student_id: req.body.data[0].id,
      twilio_body:req.body.answer
    })
    .then(function(results) {
      res.send(`successfully posted answers`);
    });
});


module.exports = router;
