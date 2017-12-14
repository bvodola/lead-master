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

router.get('/clients/:_id?', (req, res) => {
  const query = req.params._id ? { _id: req.params._id } : {};
  Clients.find(query, (e,clients) => {
    if(e) res.sendStatus(500);
    else res.send(clients);
  });
});

router.post('/clients/', (req, res) => {
  const client = req.body;
  console.log('post to clients')
  Clients.create(client, (e,client) => {
    if(e) {
      console.log(e);
      res.sendStatus(500);
    }
    else res.send(client);
  });
});

router.delete('/clients/:_id', (req, res) => {
  Clients.remove({ _id: req.params._id }, function(err) {
    if (err) res.sendStatus(500);
    else res.sendStatus(200);
  });
});

router.put('/clients/:_id', (req, res) => {
  const client = req.body;
  Clients.update({ _id: req.params._id }, { $set: client } ,function(err) {
    if (err) res.sendStatus(500);
    else res.sendStatus(200);
  });
});

module.exports = router;
