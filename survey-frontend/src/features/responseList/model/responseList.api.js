import client from '@/shared/api/client';

export const fetchResponseList = (requestParam) => {
  return client.get(
    '/survey/response/list',
    requestParam && { params: { page: requestParam.page } }
  );
};
