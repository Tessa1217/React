import client from '@/shared/api/client';

export const fetchFormById = (id) => {
  return client.get(`/survey/form/${id}`);
};
