var express = require('express');
var { Clients } = require('./models');
var router = express.Router();

router.get('/clients/', (req, res) => {

  Clients.find({}, (e,clients) => {
    if(e) res.sendStatus(500);
    else res.send(clients);
  });
});

router.post('/clients/', (req, res) => {
  const client = req.body;
  Clients.create(client, (e,client) => {
    if(e) res.sendStatus(500);
    else res.send(client);
  });
});

module.exports = router;
