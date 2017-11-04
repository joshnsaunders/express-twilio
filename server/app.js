const config = require("./config.js");
const fs = require("fs");
const database = require("./db/knex");
const fetch = require("isomorphic-fetch");
const data = require("./data");
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const ngrok = require("ngrok");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const path = require("path");
//const twilio = require("twilio");
const accountSid = process.env.SID || config.SID;
const authToken = process.env.AUTH_TOKEN || config.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const GraduatesRoutes = require("./routes/graduates")
const AnswerRoutes = require("./routes/answers")
const questions = require('./questions')
const gradclassRouter = require('./routes/gradclass')
const auth = require('./routes/auth')
const heroku = 'https://secret-mountain-48217.herokuapp.com/'

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);
app.use(GraduatesRoutes)
app.use(AnswerRoutes)
app.use(gradclassRouter)
app.use(auth)

router.get("/graduates/:class_name", function(request, response) {
  let className = request.params.class_name;
  database("graduates")
    // .select("phone_number")
    // .where("class_name", className)
    .then(function(data) {
			console.log(data);
      for(var i = 0; i < data.length; i++) {
        client.messages
          .create({
            body: `Are you attending a post high school program, Community College, or University? Text yes and what program, no or stop to opt out.`,
            to: data[i][`phone_number`],
            from: `+17206082877`
          })
          .then(message => console.log(message.sid));
      }
      response.json(data);
    });
});

app.post("/sms", (req, res) => {
  let response = new MessagingResponse();
  let body = req.body.Body.split(" ");
  let phoneNumber = req.body.From;
  console.log(phoneNumber);
  fs.readFile("./data.json", "utf-8", function(err, data) {
    let regData = JSON.parse(data);
    for (let i = 0; i < regData.length; i++) {
      for (const key in regData[i]) {
        console.log(`key`, key);
        if (key === phoneNumber) {
          regData[i][phoneNumber].push(body.splice(0, 1).join(` `));
        }
      }
    }
    console.log(`line 47`, regData);

    fs.writeFile('./data.json', `${JSON.stringify(regData)}`, function(err) {
      if (err) throw err;
      console.log('Updated!');
    });
    console.log("done!");

    fs.readFile("./data.json", "utf-8", function(err, data) {
      let regData = JSON.parse(data)
      for (let i = 0; i < regData.length; i++) {
        for (const key in regData[i]) {
          if (key === phoneNumber) {
            let numberOfAnswers = regData[i][phoneNumber]
            let valueOfAnswers = regData[i][phoneNumber][numberOfAnswers.length - 1].toLowerCase()
            console.log(`length`, numberOfAnswers);
            console.log(`value`, valueOfAnswers);

            if (numberOfAnswers.length === 1 && valueOfAnswers.toLowerCase() === 'yes'){
              response.message(questions[2])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                console.log("hello world line 92")
                postAnswersOne(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'yes'){
              console.log(`line 94`, numberOfAnswers[1]);
              response.message(questions[3])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersTwo(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[4])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersThree(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[5])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersFour(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 5 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[6])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersFive(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 6 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSix(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 7 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSeven(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length >= 8 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
							response.message(`Thanks for participating and good luck with your career.`)
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersEight(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'no'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSix(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'no'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSeven(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length >= 5 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'no'){
							response.message(`Thanks for participating and good luck with your career.`)
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersEight(req.body.Body, req.body.From);
            }
            //---------Other Branch
            if (numberOfAnswers.length === 1 && valueOfAnswers.toLowerCase() === 'no'){
              response.message(questions[3])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersOne(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[4])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersThree(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[5])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersFour(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[6])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersFive(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 5 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSix(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 6 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSeven(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length >= 7 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
							response.message(`Thanks for participating and good luck with your career.`)
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersEight(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSix(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersSeven(req.body.Body, req.body.From);
            }
            if (numberOfAnswers.length >= 4 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
							response.message(`Thanks for participating and good luck with your career.`)
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
                postAnswersEight(req.body.Body, req.body.From);
            }
          }
        }
      }
    })
  })

});




function postAnswersOne(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q1Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}

function postAnswersTwo(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q2Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersThree(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q3Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersFour(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q4Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersFive(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q5Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersSix(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q6Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersSeven(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q7Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}
function postAnswersEight(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`${heroku}q8Answers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          data,
          answer
        })
      });
    })
    .catch(function(res) {
      //console.log(res);
    });
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
