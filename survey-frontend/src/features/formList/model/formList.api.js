import client from '@/shared/api/client';

export const fetchFormList = ({ currentPage = 0, limit = 10, search = {} }) => {
  return client.get('/survey/form/list', {
    params: { page: currentPage, size: limit, ...search },
  });
};

/**
 * 설문지 삭제 API
 * @param {Number} id
 * @returns {Promise} 설문지 삭제
 */
export const deleteForm = (id) => {
  return client.post('/survey/form/del', [id]);
};
