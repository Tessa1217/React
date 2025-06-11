import client from '@/shared/api/client';

/**
 * 설문지 응답 목록 조회 API
 * @param {Number} currentPage 현재 페이지 번호
 * @param {Number} limit 페이지 최대 fetching 데이터 수
 * @param {Object} search 검색 조건
 * @returns {Promise} 설문지 응답 목록 조회
 */
export const fetchResponseList = ({
  currentPage = 0,
  limit = 10,
  search = {},
}) => {
  return client.get('/survey/response/list', {
    params: { page: currentPage, size: limit, ...search },
  });
};
