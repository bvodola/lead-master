import axios from 'axios';
import { cookie } from './';

const port = process.env.PORT || 2000;

export default axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'http://www.leadmaster.com.br' : 'http://localhost:'+String(port)
});