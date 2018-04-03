import axios from 'axios';
import { cookie } from './';

const port = process.env.PORT || 2000;
let baseURL;

switch(process.env.NODE_ENV) {
  case('development'):
    baseURL = 'http://localhost:'+String(port);
    break;
  case('staging'):
    baseURL = 'http://lead-master-staging.mybluemix.net';
    break;
  case('production'):
    baseURL = 'http://www.leadmaster.com.br';
    break;
  default:
    baseURL = 'http://localhost:'+String(port);
}

export default axios.create({baseURL});