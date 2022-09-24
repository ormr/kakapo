import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer ' + cookies?.token,
  }
});

export { Axios };