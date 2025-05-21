import client from '@/shared/api/client';

export const getSurveyFormList = (requestParam) => {
  return client.get(
    '/survey/form/list',
    requestParam && { params: { page: requestParam.page } }
  );
};
