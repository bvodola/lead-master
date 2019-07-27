const express = require('express');
const axios = require('axios');
const { Clients, Users, Messages } = require('./models');
const router = express.Router();

router.post('/inbox', (req, res) => {
  const { sender, recipient, subject, body_plain } = req.body;

  // https://jsbin.com/gezuhokove/edit?js,console

  Users.findOne({ email: sender }, function (err, user) {
    user = user.toObject();

    if (err)
      res.send(err);

    if (!user)
      res.send(401)

    axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        "start": {
      		"dateTime": "2017-12-10T10:00:00",
      		"timeZone": "America/Sao_Paulo"
      	},
      	"end": {
      		"dateTime": "2017-12-10T11:00:00",
      		"timeZone": "America/Sao_Paulo"
      	},
      	"summary": subject
      },
      {
        headers: {
          'Authorization': 'Bearer '+user.services.google[0].accessToken
        }
      }
    ).then((postRes) => {
      console.log(postRes)
    }).catch((err) => {
      console.log(err)
    });

  });

  Messages.create(req.body, (err,message) => {
    if(err) res.sendStatus(500);
    else res.send(message);
  });
})

module.exports = router;
