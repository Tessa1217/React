import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

/**
 * 페이징 상태를 관리하는 Redux slice
 *
 * 구조 예시:
 * {
 *   formList: {
 *     currentPage: 0,
 *     totalItems: 100,
 *     limit: 10,
 *     search: { searchKeyword: 'test' }
 *   },
 *   responseList: { ... }
 * }
 */
const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    /**
     * 주어진 key에 해당하는 페이징 정보를 병합하여 설정
     * 기존 값을 덮어쓰거나 추가
     */
    setPaging: (state, { payload }) => {
      const { key, pageInfo } = payload;
      state[key] = { ...state[key], ...pageInfo };
    },
    /**
     * 현재 페이지 번호만 변경
     */
    setPagingNumber: (state, { payload }) => {
      const { key, page } = payload;
      state[key].currentPage = page;
    },
    /**
     * 검색 조건을 저장
     */
    setSearchParams: (state, { payload }) => {
      const { key, search } = payload;
      if (!state[key]) state[key] = {};
      state[key].search = search;
    },
    /**
     * 특정 key에 해당하는 페이징 정보를 초기화
     */
    resetPaging: (state, { payload: key }) => {
      delete state[key];
    },
  },
});

export const { setPaging, setPagingNumber, resetPaging, setSearchParams } =
  pagingSlice.actions;
export default pagingSlice.reducer;
