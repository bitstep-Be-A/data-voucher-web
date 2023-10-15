import axios from 'axios';
import { AxiosError } from 'axios';

import type { ErrorDetail } from '../types/common';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    common: {},
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_WEB_HOST_URL,
    'Access_Control-Allow-Credentials': "true",
  },
});

export function getAxiosResponse(error: unknown): ErrorDetail {
  if (!(error instanceof AxiosError) || !error.response) {
    console.error(error);
    throw error;
  }
  return {
    name: error.response.statusText,
    message: error.response.data.error || error.response.statusText,
    code: error.response.status
  }
}
