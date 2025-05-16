import client from '../../utils/client';

export const login = async ({ email, password }) => {
  const response = await client.get('http://localhost:3001/users', {
    params: { email, password },
  });
  return response.data;
};

export const register = ({ email, password }) => {
  return client.post('httpL//localhost:3001/users', { email, password });
};
