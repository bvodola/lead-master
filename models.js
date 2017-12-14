const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const clientsSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const logsSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const tasksSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const messagesSchema = new Schema({
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const models = {};
models.Users = mongoose.model('users', usersSchema);
models.Clients = mongoose.model('clients', clientsSchema);
models.Logs = mongoose.model('logs', logsSchema);
models.Tasks = mongoose.model('tasks', tasksSchema);
models.Messages = mongoose.model('messages', messagesSchema);

module.exports = models;
