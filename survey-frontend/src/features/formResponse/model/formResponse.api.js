import client from '@/shared/api/client';

export const fetchFormResponseById = (id) => {
  return client.get(`/survey/response/${id}`);
};
