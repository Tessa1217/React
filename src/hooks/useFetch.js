import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * General hook for mutations (POST, PUT, DELETE, etc.)
 *
 * @param {string} method - HTTP method ('post', 'put', 'delete', etc.)
 * @param {string} url - URL endpoint
 * @param {object} config - optional axios config
 * @returns mutation object from react-query
 */
export const useAxiosMutation = (method, url, config = {}) => {
  const mutationFn = (data) => axios[method](url, data, config);
  return useMutation(mutationFn);
};

/**
 * General hook for GET requests with react-query caching & params
 *
 * @param {string} url - URL endpoint
 * @param {object} params - query params object
 * @param {object} config - optional axios config
 * @param {object} options - react-query options (enabled, staleTime, etc.)
 * @returns query object from react-query
 */
export const useAxiosQuery = (url, params = {}, config = {}, options = {}) => {
  const queryFn = () =>
    axios.get(url, { ...config, params }).then((res) => res.data);

  return useQuery([url, params], queryFn, options);
};
