import client from '@/shared/api/client';

/**
 * 설문지 상세조회 API
 * @param {Number} id
 * @returns {Promise} 설문지 상세조회
 */
export const fetchFormResponseById = (id) => {
  return client.get(`/survey/response/${id}`);
};
