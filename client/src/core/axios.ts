import axios from 'axios';

export const BASE_URL = 'http://localhost:3001';

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default Axios;
