const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('cookie-session');
const ejs = require('ejs');
const api = require('./api');
const models = require('./models');
const tokens = require('./auth/tokens');

// ==============
// Initial Config
// ==============
const app = express();
const port = process.env.PORT || 2000;
const server = http.createServer(app);
app.set('view engine', 'ejs');

// ====
// CORS
// ====
if(app.settings.env !== 'production') {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
}

// ==========
// Middleware
// ==========
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static/'));
app.use(session({secret: 'passport-secret'}));
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
app.use('/api/clients',
	(req, res, next) => tokens.validateMiddleware(req, res, next),
	async (req, res, next) => {
		try {
			let user = (await models.Users.findOne({_id: res.locals.user_id}).exec()).toObject();
			

			if(req.method == 'GET') {

				let company = (await models.Companies.findOne({_id: user.company_id}).exec()).toObject();
				let queries = [{ company_id: user.company_id }];

				if(company.external_clients)
					queries = queries.concat(company.external_clients.map((v) => v.query));
					
				res.locals.query = {
					$and: [
						{ $or: queries }
					]
				}
			}

			if(req.method == 'POST') {
				req.body.company_id = user.company_id;
			}
			
			next();

		} catch(err) {
			res.status(500).send({message: err.message});
		}
		
	},
	require('./crud')(models.Clients, {
		searchFields: ['name', 'rg.number', 'cpf', 'phone', 'email', 'accident_date']
	})
);
app.use('/api/logs', require('./crud')(models.Logs));
app.use('/api/tasks', require('./crud')(models.Tasks));

// =====
// Views
// =====
app.get('/documents/:client_id', function(req, res) {
	models.Clients.findOne({_id: req.params.client_id}, (err, client) => {

		if(client) {
			let context = {  client: client.toObject() || {} };
			const d = new Date();
			const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

			if(typeof context.client.products !== 'undefined') {
				let products = {};
				context.client.products.forEach((product) => {
					products[product] = true;
				});
				context.client.products = products;
			}

			context.fullDate = d.getDate()+' de '+months[d.getMonth()]+' de '+d.getFullYear();
			context.date = { day: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() }
			context.client.isUnder16 = Math.floor(((new Date()) - new Date(context.client.birthday))/31536000000) < 16;

			context.client.bank_account.agency = context.client.bank_account.agency.split('-');
			context.client.bank_account.number = context.client.bank_account.number.split('-');


			res.render('forms/index', context);
		} else {
			res.send('Cliente não encontrado.');
		}
	});
});

// ===================
// Production Settings
// ===================
if(app.settings.env === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ======
// Server
// ======
server.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
