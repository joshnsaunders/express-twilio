const config = require("./config.js");
const fs = require("fs");
//console.log(config);
//let data = require('./data')
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const ngrok = require("ngrok");
const cors = require("cors");
let PORT = process.env.PORT || 3000;
const path = require("path");
const twilio = require("twilio");
const accountSid = process.env.SID || config.SID;
console.log(accountSid);
const authToken = process.env.AUTH_TOKEN || config.AUTH_TOKEN;
console.log(authToken);
let client = new twilio(accountSid, authToken);
let MessagingResponse = require("twilio").twiml.MessagingResponse;

var graduates = require('./routes/graduates')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(graduates)
app.post("/sms", (req, res) => {
  const resp = new MessagingResponse();

  let list = [];
  let body = req.body.Body;

  // fs.readFile("./data.json", "utf-8", function(err, data) {
  //   let allData = JSON.parse(data);
  //   //console.log(`line 37`, allData[0].start);
  //   return allData[0].start
  // });

  let answers = [];
  body = body.split(" ");
  if (body[0] === `add` || body[0] === `Add` || body[0] === `ADD`) {
    fs.readFile("./data.json", "utf-8", function(err, data) {
      let regData = JSON.parse(data);
      regData[0].start.push(body.splice(1, body.length).join(` `));
      console.log(`line 47`, regData);
      fs.writeFile(
        "./data.json",
        `[${JSON.stringify(regData[0])}]`,
        "utf-8",
        function() {
          fs.readFile("./data.json", "utf-8", function(err, data) {
            let responseData = JSON.parse(data);
            let response = responseData[0].start.join(", ");
            answers.push(response);
            respons(answers);
          });
          console.log("done!");
        }
      );
    });
      resp.message(`the end`)
  } else if (body[0] === `list` || body[0] === `List` || body[0] === `LIST`) {
    for (let i = 0; i < array.length; i++) {
      list.push(`${i + 1}. ${array[i]}`);
    }
    list = list.join(" ");
    resp.message(list);
  } else if (
    body[0] === `remove` ||
    body[0] === `Remove` ||
    body[0] === `REMOVE`
  ) {
    array.splice(Number(body[1]) - 1, 1);
    array = array.join(" ");
    resp.message(array);
  } else resp.message(`hi`);
  res
    .status(200)
    .contentType("text/xml")
    .send(resp.toString());
});

app.get("/sms/send", (req, res) => {
  // client.messages
  //   .create({
  //     body: `You got a text from port ${PORT}`,
  //     to: "+12072130205",
  //     from: "+17206082877"
  //   })
  //   .then(function(data) {
  //     console.log(data.body);
  console.log(`hi`);
  res.send(`hi`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
