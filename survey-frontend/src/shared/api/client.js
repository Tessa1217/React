import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_SERVER_URL;

const client = axios.create({
  baseURL,
  headers: {
    get: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    post: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
});

export default client;
