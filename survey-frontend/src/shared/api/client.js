import axios from 'axios';
import store from '@/app/store';
import { createAnonymousId, getAnonymousId } from '@/shared/lib/anonymousUtil';

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

client.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    const token = auth?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      let anonymousId = getAnonymousId();
      if (!anonymousId) {
        anonymousId = createAnonymousId();
      }
      config.headers['X-Anonymous-Id'] = anonymousId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
