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
const twilio = require("twilio");
const accountSid = process.env.SID || config.SID;
const authToken = process.env.AUTH_TOKEN || config.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const GraduatesRoutes = require("./routes/graduates")
const AnswerRoutes = require("./routes/answers")
const questions = require('./questions')

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);
app.use(GraduatesRoutes)
app.use(AnswerRoutes)

router.get("/graduates/:class_name", function(request, response) {
  let className = request.params.class_name;
  database("graduates")
    .select("phone_number")
    .where("class_name", className)
    .then(function(data) {
      for (var i = 0; i < data.length; i++) {
        client.messages
          .create({
            body: ` Are you attending a community college or post high school program of less than 2 years? Text YES, NO or STOP to opt out.`,
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
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'yes'){
              console.log(`line 94`, numberOfAnswers[1]);
              response.message(questions[3])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[4])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[5])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 5 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[6])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 6 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 7 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'yes'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'no'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[2].toLowerCase() === 'no'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            //---------Other Branch
            if (numberOfAnswers.length === 1 && valueOfAnswers.toLowerCase() === 'no'){
              response.message(questions[3])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[4])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[5])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[6])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 5 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 6 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
              response.message(questions[7])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }
            if (numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
              response.message(questions[8])
                res.writeHead(200, {
                  "Content-Type": "text/xml"
                });
                res.end(response.toString());
            }


            //function createMessage(numberofAnswers, valueOfAnswers)
            // if (numberOfAnswers.length === 1 && valueOfAnswers === 'yes') {
            //   console.log('should be sending');
            //   response.message(questions[3])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if (numberOfAnswers.length === 1 && valueOfAnswers === 'no') {
            //   response.message(questions[2])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if(numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no') {
            //   response.message(questions[4])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if(numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'yes'){
            //   response.message(questions[3])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if(numberOfAnswers.length === 2 && numberOfAnswers[0].toLowerCase() === 'yes'){
            //   response.message(questions[4])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if(numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'yes'){
            //   response.message(questions[5])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            // if(numberOfAnswers.length === 3 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no'){
            //   response.message(questions[5])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            //
            // if(numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'yes' && numberOfAnswers[3].toLowerCase() === 'no'){
            //   response.message(questions[11])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }
            // if(numberOfAnswers.length === 4 && numberOfAnswers[0].toLowerCase() === 'no' && numberOfAnswers[1].toLowerCase() === 'no' && numberOfAnswers[2].toLowerCase() === 'no' && numberOfAnswers[3].toLowerCase() === 'no'){
            //   response.message(questions[11])
            //   res.writeHead(200, {
            //     "Content-Type": "text/xml"
            //   });
            //   res.end(response.toString());
            // }




            // else {
            //   response.message(`no bueno`)
            //   // res.writeHead(200, {
            //   //   "Content-Type": "text/xml"
            //   // });
            //   // res.end(response.toString());
            //
            // }
          }
        }
      }
    })
  })
  // if (body[0].toLowerCase() === "yes") {
  //   postAnswerOne(req.body.Body, phoneNumber);
  //
  //   let newResponse = `q3`;
  //   response.message(newResponse);
  // } else if (body[0].toLowerCase() === "no") {
  //   postAnswerOne(req.body.Body, phoneNumber);
  //   response.message("q2");
  // }
  // else {
  //   postAnswerOne(req.body.Body, phoneNumber);
  //   response.message("Go Team GO!");
  // }

});




function postAnswerOne(answer, phoneNumber) {
  let number = database("graduates")
    .where({
      phone_number: phoneNumber
    })
    .select("*")
    .then(data => {
      //  console.log(data);
      fetch(`http://localhost:3000/q1Answers`, {
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
