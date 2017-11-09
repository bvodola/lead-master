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

const Users = mongoose.model('users', usersSchema);
const Clients = mongoose.model('clients', clientsSchema);
const Logs = mongoose.model('logs', logsSchema);
const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = { Users, Clients };
