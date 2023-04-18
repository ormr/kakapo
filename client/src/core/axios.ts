import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default Axios;
