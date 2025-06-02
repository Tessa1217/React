import client from '@/shared/api/client';

export const fetchResponseList = ({
  currentPage = 0,
  limit = 10,
  search = {},
}) => {
  return client.get('/survey/response/list', {
    params: { page: currentPage, size: limit, ...search },
  });
};
