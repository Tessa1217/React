import client from '@/shared/api/client';

export const fetchFormList = ({ currentPage = 0, limit = 10, search = {} }) => {
  return client.get('/survey/form/list', {
    params: { page: currentPage, size: limit, ...search },
  });
};
