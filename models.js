const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongoosePromise = mongoose.connect('mongodb://bvodola:qZwX1001@ds127163.mlab.com:27163/leadmaster', {useMongoClient: true});
mongoosePromise.catch((reason) => {console.log(reason)});

// =======
// Schemas
// =======
const usersSchema = new Schema({
    email: String,
    password: String,
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const clientsSchema = new Schema({
    company_id: Schema.ObjectId,
    is_lead: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },
    lead_description: String,
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      status: String,
      history: Array,
      accidentDate: String,
      entryDate: String,
      link: String,
      externalStatus: String,
      type: String,
      code: String
    }],
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

var autoPopulateClient = function(next) {
  this.populate('products.product', 'name')
  next();
};

clientsSchema
  .pre('find', autoPopulateClient)
  .pre('findOne', autoPopulateClient)
  
const logsSchema = new Schema({
    user_id: Schema.ObjectId,
    client_id: Schema.ObjectId,
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const tasksSchema = new Schema({
    user_id: Schema.ObjectId,
    client_id: Schema.ObjectId,
    created: { type: Boolean, default: false },
    assignees: [Schema.ObjectId],
    date: { type: Date, default: null },
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const messagesSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const companiesSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const leadsSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const productsSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const feedSchema = new Schema({
    created: { type: Date, default: Date.now },
    type: String,
    data: Array,
  },
  { strict: false}
);

const models = {};
models.Users = mongoose.model('users', usersSchema);
models.Clients = mongoose.model('clients', clientsSchema);
models.Logs = mongoose.model('logs', logsSchema);
models.Tasks = mongoose.model('tasks', tasksSchema);
models.Messages = mongoose.model('messages', messagesSchema);
models.Companies = mongoose.model('companies', companiesSchema);
models.Leads = mongoose.model('leads', leadsSchema);
models.Products = mongoose.model('products', productsSchema);
models.Feed = mongoose.model('feed', feedSchema);

module.exports = models;
