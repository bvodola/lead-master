var express = require('express');
var { registerMiddleware } = require('./index');
var router = express.Router();

module.exports = function(passport) {

  router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.send(req.user);
    });

  router.post('/register',
    (req, res) => registerMiddleware(req, res));

  router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  router.get('/facebook/callback',
    passport.authenticate('facebook'),
    function(req, res) {
      const user = req.user.toObject();
      res.cookie('token', user.tokens.local);
      res.redirect('http://localhost:4000');
    });

  router.get('/twitter',
    passport.authenticate('twitter'));

  router.get('/twitter/callback',
    passport.authenticate('twitter'),
    function(req, res) {
      const user = req.user.toObject();
      res.cookie('token', user.tokens.local);
      res.redirect('http://localhost:4000');
    });

  return router;
}
