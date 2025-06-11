/**
 * 주어진 key에 해당하는 페이징 정보를 상태에서 추출하는 셀렉터 함수
 *
 * @param {string} key - 페이징 상태를 구분하는 키
 * @returns {(state: RootState) => PagingState} - 상태에서 해당 키의 페이징 정보 반환
 */
export const selectPagingByKey =
  (key) =>
  ({ paging }) =>
    paging[key] || {};
