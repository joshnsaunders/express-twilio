//const config = require('./config.js')
//console.log(config);

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
const accountSid = process.env.SID
console.log(accountSid);
const authToken = process.env.AUTH_TOKEN
console.log(authToken);
let client = new twilio(accountSid, authToken);
let MessagingResponse = require("twilio").twiml.MessagingResponse;




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));


app.post("/sms", (req, res) => {
  console.log(req.body.Body);
  console.log(req.body.From);

  const resp = new MessagingResponse();
  const nateInsults = [`U know why the ping pong table didn't tweet #MeToo?... cause you never hit it`, `That cheetah joke was terrible - What do you call a dog with no legs? Doesn't matter what you call him, he still ain't gonna come.`, `Ur q3 is an art project`, `20-12... 23-21 INSERT SMILEY FACE WHERE USER === JOSH`, `Dude, ur getting trolled by a Node server, Math.floor(Math.random * 5) - don't make me explain it.`]
  let random = Math.floor(Math.random()*5)
  console.log(nateInsults[random]);

  //let from = req.body.From;

  if (req.body.From === `+18102943376` || req.body.Body === `troll` || req.body.Body === `Troll`){
    resp.message(nateInsults[random])
  }
  else if (req.body.From === `+15038902873`  || req.body.Body === `kyle` || req.body.Body === `Kyle`) {
    resp.message(`Kyle, ur a bomb developer. Now go write some code so our Q3 doesn't suck.`)
  }
  else if (req.body.From === `+12072130205` || req.body.Body === `josh` || req.body.Body === `Josh`){
    resp.message(`nice work broski, go to bed`)
  }
  else (resp.message(`Thanks for texting you, ur the best! Please send Josh ur phone number at 207-213-0205 so he can add you to his data object. Thanks!`))

  //  resp.message(format('Hello, %s, you said: %s', sender, body));
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
    })

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
