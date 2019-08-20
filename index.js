const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('cookie-session');
const ejs = require('ejs');
var mongoose = require('mongoose');
const apolloServer = require('./apollo')
const api = require('./api');
const models = require('./models');
const tokens = require('./auth/tokens');
const commons = require('./commons');
const {unmaskCPF} = require('./helpers');
const createReport = require('docx-templates');
const DocxMerger = require('docx-merger');
const cloudinary = require('cloudinary').v2;
const word2pdf = require('word2pdf');

// ==============
// Initial Config
// ==============
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.set('view engine', 'ejs');
apolloServer.applyMiddleware({ app })
app.use('/graphql', () => {})

// ====
// CORS
// ====
app.use((req, res, next) => {
  const allowedOrigins = ['http://www.leadmaster.com.br', 'http://www.indenizamais.com.br'];
  allowedOrigins.forEach(origin => {
    res.header('Access-Control-Allow-Origin', origin);
  })

  if(app.settings.env !== 'production') res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// ==========
// Middleware
// ==========
app.use(bodyParser.json({limit: '50mb'}));
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
app.use('/api/mail', require('./mail'));

app.use('/integrations/hyperseg', async (req, res) => {
  const hypersegClients = req.body;

  await models.Feed.remove({
    type: 'hyperseg',
  });

  await models.Feed.create({
    type: 'hyperseg',
    data: hypersegClients,
  });

  res.send({message: 'OK'}).status(200);
});


const getStatusCodeFromTitle = (statusTitle) => {
  switch(statusTitle) {
    case 'DOCUMENTAÇÃO COMPLEMENTAR RECEBIDA NA UNIDADE':
      return '6';
    case 'PEDIDO DE REPROGRAMAÇÃO DE PAGAMENTO - ANALISADO E APROVADO':
      return '6';
    case 'PROCESSO ANALISADO E APROVADO (aguarda liberação do sistema da Seguradora Líder)':
      return '6';
    case 'PROCESSO COM RESTRIÇÕES':
      return '11';
    case 'PROCESSO DEVOLVIDO':
      return '8';
    case 'PROCESSO EM FASE DE REPROGRAMAÇÃO DE ESTORNO':
      return '';
    case 'PRÉ-CADASTRO COM RESTRIÇÕES':
      return '5';
    case 'PROCESSO COM PENDENCIA':
      return '11';
    case 'PROC. REABERTO (ANALISADO E APROVADO)':
      return '6';
    case 'PROCESSO ENVIADO PARA ANÁLISE DA SEGURADORA LÍDER':
      return '6';
    case 'PROCESSO ENVIADO PARA PERICIA':
      return '12';
    case 'PROCESSO ANALISADO E APROVADO':
      return '6';
    case 'PROCESSO EM VERIFICACAO COMPLEMENTAR':
      return '10';
    case 'REANALISE MANTIDA':
      return '6';
    case 'PROCESSO CANCELADO':
      return '8';
    case 'PROCESSO NEGADO':
      return '8';
    case 'PAGAMENTO ESTORNADO':
      return '11';
    case 'PROCESSO PAGO':
      return '7';
    default:
      return '0';
  }
}

app.use('/get/hyperseg', async (req, res) => {

  try {

    const feed = await models.Feed.findOne({type: 'hyperseg'});
    const hypersegClients = feed.data;
    const DPVAT_ADM = 'DPVAT Administrativo';

    let clients = (await models.Clients.find()).map(c => c.toObject());

    clients = await Promise.all(clients.map(async c => {
      let h = hypersegClients.find(h => unmaskCPF(c.cpf) === unmaskCPF(h.cpf));
      if(typeof h !== 'undefined') {

        const updatedProduct = {...h};
        updatedProduct.externalStatus = updatedProduct.status;
        updatedProduct.status = getStatusCodeFromTitle(updatedProduct.status);

        let productWasFound = false;
        c.products = c.products.map(p => {
          if(p.product.name === DPVAT_ADM) {
            p = {
              ...p,
              ...updatedProduct,
            }
            productWasFound = true;
          }
          return p;
        });

        if(!productWasFound) {
          c.products = [
            ...c.products,
            {
              product: mongoose.Types.ObjectId("5b41298f7997cfafafe2b3c6"),
              ...updatedProduct
            }
          ]
        }

        // let {_id} = c;
        // delete c._id;
        // await models.Clients.update({_id},{$set: c})

        return c; 
      }
    }));

    res.send(clients);

  } catch(err) {
      res.send(err).status(500);
  }

});

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
app.use('/api/leads', require('./crud')(models.Leads));
app.use('/api/products', require('./crud')(models.Products));

// =========
// Documents
// =========
app.get('/documents/:client_id', async function(req, res) {

  try {
		let client = await models.Clients.findOne({_id: req.params.client_id}).exec();

    if(1==2 && fs.existsSync(path.resolve(__dirname, `static/reports/${req.params.client_id}.docx`))) {
      res.statusCode = 302;
      res.setHeader("Location", `https://docs.google.com/gview?url=${req.headers.host}/static/reports/${req.params.client_id}.docx`);
      res.end();

    }
		else if(client) {

      // Set client and company
			client = client.toObject();
			client.company = (await models.Companies.findOne({_id: client.company_id}).exec()).toObject();
			client.company.location = client.company.address.city + '/' + client.company.address.state;
      let context = {  client: client || {} };
			
      // Set client products object
			if(typeof context.client.products !== 'undefined') {
				let products = {};
				context.client.products.forEach((product) => {
					products[product] = true;
				});
				context.client.products = products;
			}

      // Full Date object
      const d = new Date();
			const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
			context.fullDate = d.getDate()+' de '+months[d.getMonth()]+' de '+d.getFullYear();
      context.date = { day: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() }

      // Accident date array
      context.accident_date_array = client.accident_date.split('/');

      // Set isUnder16 
			let b = commons.date.convertFromString(context.client.birthday);
			context.client.isUnder16 = commons.date.getAge(b) < 16;

      // Format Bank account
			context.client.bank_account.agency = context.client.bank_account.agency.split('-');
      context.client.bank_account.number = context.client.bank_account.number.split('-');

      // Company
      context.company = client.company;

      // Alias for client prop (because context.client naming has issues)
      context._client = { ...context.client };
      context.victim = { ...context.client };
      context.tutor = {
        ...context.client.tutor,
        address: client.address,
        bank_account: client.bank_account,
        rg: {
          number: '',
          emitter: '',
          expedition_date: '',
        }
      };
      context.benef = context.tutor.cpf === '' ?
        context.client : context.tutor;
      context.vehicle = {
        type: '',
        model: '',
        year: '',
        plate: '',
        id: '',
        owner: {
          name: '',
          rg: {
            number: '',
            emitter: '',
            expedition_date: {
              day: '',
              month: '',
              year: '',
            }
          },
          cpf: '',
          address: {
            street: '',
            number: '',
            city: '',
            state: '',
            zip: '',
          },
        },
        driver: {
          name: '',
          rg: {
            number: '',
            emitter: '',
          },
          cpf: '',
          address: {
            street: '',
            number: '',
            city: '',
            state: '',
            zip: '',
          },
        }
      }

      delete context.client;
      
      // Array of templates
      const templates = [
        'contrato',
        'formulario_unico',
        'iprf',
        'lavagem_de_dinheiro',
        'pobreza',
        'procuracao_adm',
        'procuracao_jud',
        'prop_veiculo',
      ]

      let files = [];

      templates.forEach(templateName => {
        var file = fs.readFileSync(path.resolve(__dirname, `static/templates/${templateName}.docx`), 'binary');
        files.push(file);
      });

      var mergedDocx = new DocxMerger({},files);
      await mergedDocx.save('nodebuffer',function (data) {
        
        fs.writeFile(`static/templates/merged/${context._client._id}.docx`, data, async function(err) {
          if(err) console.log(err);

          // Create report from merged template
          await createReport({
            template: `static/templates/merged/${context._client._id}.docx`,
            output: `static/reports/${context._client._id}.docx`,
            cmdDelimiter: '++',
            data: context,
          });

          // const pdfData = await word2pdf(`static/reports/${context._client._id}.docx`);
          // fs.writeFileSync(`static/reports/${context._client._id}.pdf`, pdfData);
          // http://a62159cb.ngrok.io
          res.statusCode = 302;
          res.setHeader("Location", `https://docs.google.com/gview?url=${req.headers.host}/static/reports/${context._client._id}.docx`);
          res.end();
        });
      });

      

		} else {
			res.send('Cliente não encontrado.');
		}
  } catch(err) {
    console.error(err);
    res.send(err);
  }
});

// ===================
// Production Settings
// ===================
if(app.settings.env === 'production') {
	app.use(express.static('./client/build'));
  app.get('*', function (req, res) {
    res.sendFile('./client/build/index.html', {"root": __dirname});
  });
}

// ======
// Server
// ======
server.listen(port, () => console.log(`Listening on port ${port}, ${apolloServer.graphqlPath}`));
module.exports = app;
