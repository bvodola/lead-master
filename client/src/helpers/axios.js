const axios = require('axios');
const port = process.env.PORT || 2000;

module.exports = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'http://www.leadmaster.com.br' : 'http://localhost:'+String(port)
});
