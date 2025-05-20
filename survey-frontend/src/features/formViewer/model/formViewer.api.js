import client from '@/shared/api/client';

export const getSurveyFormList = () => {
  return client.get('/survey/form/list');
};

export const getSurveyForm = (id) => {
  return client.get(`/survey/form/${id}`);
};
