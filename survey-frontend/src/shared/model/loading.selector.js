/**
 * 전역 Redux 상태에서 로딩 상태를 추출하는 셀렉터
 *
 * @param {Object} state - Redux 루트 상태 객체
 * @returns {boolean} 현재 로딩 중인지 여부
 */
export const loadingState = ({ loading }) => loading.loading;
