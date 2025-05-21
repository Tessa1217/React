import client from '@/shared/api/client';

export const fetchFormList = (requestParam) => {
  return client.get(
    '/survey/form/list',
    requestParam && { params: { page: requestParam.page } }
  );
};
