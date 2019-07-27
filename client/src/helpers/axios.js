import axios from 'axios';
import { cookie } from './';

const port = process.env.PORT || 3000;
const NGROK_URL = 'http://8f3a2ed3.ngrok.io'
const NGROK = false;
let BASE_URL;

switch(process.env.NODE_ENV) {
  case('development'):
    BASE_URL = NGROK ? NGROK_URL : 'http://localhost:'+String(port);
    break;
  case('staging'):
    BASE_URL = 'http://lead-master-staging.mybluemix.net';
    break;
  case('production'):
    BASE_URL = process.env.BASE_URL;
    break;
  default:
    BASE_URL = 'http://localhost:'+String(port);
}



export default axios.create({baseURL: BASE_URL});