const express = require("express");
const mailgun = require("mailgun.js");
const router = express.Router();

const API_DOMAIN = "classicmotors.com.br";
const API_KEY = "key-e361b11a3cc622e15483b061d5ea7e61";

const mg = mailgun.client({ username: "api", key: API_KEY });

router.post("/send/", function(req, res) {
  let { from, to, subject, text, html, domain } = req.body;
  if (!domain) domain = API_DOMAIN;
  if (!html) html = text;
  if (!text) text = html;

  mg.messages
    .create(domain, { from, to, subject, text, html })
    .then(msg => {
      console.log(msg);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.send(err).status(500);
    });
});

module.exports = router;
