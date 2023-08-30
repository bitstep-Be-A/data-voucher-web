import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const Axios = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    common: {},
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_WEB_HOST_URL,
    'Access_Control-Allow-Credentials': "true",
  },
});
