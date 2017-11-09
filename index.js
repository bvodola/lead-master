const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const api = require('./api');

// ==============
// Initial Config
// ==============
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// ====
// CORS
// ====
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// ==========
// Middleware
// ==========
app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
app.use(session({secret: 'passport-secret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());

// ====
// Auth
// ====
require('./auth/strategies')(passport);
app.use('/auth', require('./auth/routes')(passport));

// ===
// API
// ===
app.use('/api', api);

// ===================
// Production Settings
// ===================
if(app.settings.env == 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ======
// Server
// ======
server.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
