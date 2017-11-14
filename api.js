var express = require('express');
var { Clients } = require('./models');
var router = express.Router();

router.get('/clients/:_id?', (req, res) => {
  const query = req.params._id ? { _id: req.params._id } : {};
  Clients.find(query, (e,clients) => {
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
