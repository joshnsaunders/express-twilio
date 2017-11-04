//const config = require("../server/config.js");
//const fs = require("fs");
//const database = require("./db/knex");
//const fetch = require("isomorphic-fetch");
//const data = require("./data");
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const ngrok = require("ngrok");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
//const path = require("path");
//const twilio = require("twilio");
const accountSid = process.env.SID || config.SID;
const authToken = process.env.AUTH_TOKEN || config.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
//const MessagingResponse = require("twilio").twiml.MessagingResponse;
//const GraduatesRoutes = require("./routes/graduates")
//const AnswerRoutes = require("./routes/answers")
//const questions = require('./questions')
//const gradclassRouter = require('./routes/gradclass')
//const auth = require('./routes/auth')
//const heroku = 'https://stark-reef-91742.herokuapp.com/'
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, "../public")));
app.use(router);


router.get("/sendtext", function(request, response) {
        client.messages
          .create({
            body: `Sent a text from heroku server.`,
            to: `+12072130205`,
            from: `+17206082877`
          })
          //.then(message => console.log(message.sid));
          response.send('yay')
      })
//       response.send(`yay`);
//     });
// });
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// router.get("/graduates/:class_name", function(request, response) {
//   let className = request.params.class_name;
//   database("graduates")
//     // .select("phone_number")
//     // .where("class_name", className)
//     .then(function(data) {
// 			console.log(data);
//       for(var i = 0; i < data.length; i++) {
//         client.messages
//           .create({
//             body: `Are you attending a post high school program, Community College, or University? Text yes and what program, no or stop to opt out.`,
//             to: data[i][`phone_number`],
//             from: `+17206082877`
//           })
//           .then(message => console.log(message.sid));
//       }
//       response.json(data);
//     });
// });
