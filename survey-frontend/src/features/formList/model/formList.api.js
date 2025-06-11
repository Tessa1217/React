import client from '@/shared/api/client';

/**
 * 설문지 목록 조회 API
 * @param {Number} currentPage 현재 페이지 번호
 * @param {Number} limit 페이지 최대 fetching 데이터 수
 * @param {Object} search 검색 조건
 * @returns {Promise} 설문지 목록 조회
 */
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
