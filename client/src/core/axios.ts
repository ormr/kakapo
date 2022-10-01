import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const Axios = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Cookies: `Authorization ${cookies?.token}`,
  },
});

export { Axios };
