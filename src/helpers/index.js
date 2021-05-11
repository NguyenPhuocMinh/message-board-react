import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:7979/rest/api',
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
  }
})

export {
  http,
};