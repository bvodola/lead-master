const axios = require('axios');
const port = process.env.PORT || 4000;

module.exports = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'http://lead-master.mybluemix.net' : 'http://localhost:'+String(port)
});
