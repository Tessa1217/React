import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setPaging: (state, { payload }) => {
      const { key, pageInfo } = payload;
      state[key] = { ...state[key], ...pageInfo };
    },
    setPagingNumber: (state, { payload }) => {
      const { key, page } = payload;
      state[key].currentPage = page;
    },
    setSearchParams: (state, { payload }) => {
      const { key, search } = payload;
      if (!state[key]) state[key] = {};
      state[key].search = search;
    },
    resetPaging: (state, { payload: key }) => {
      delete state[key];
    },
  },
});

export const { setPaging, setPagingNumber, resetPaging, setSearchParams } =
  pagingSlice.actions;
export default pagingSlice.reducer;
