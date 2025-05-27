import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setPaging: (state, { payload }) => {
      console.log(payload);
      const { key, paging } = payload;
      state[key] = { ...state[key], ...paging };
    },
    setPagingNumber: (state, { payload }) => {
      const { key, page } = payload;
      state[key].pageNumber = page;
    },
    resetPaging: (state, { payload: key }) => {
      delete state[key];
    },
  },
});

export const { setPaging, setPagingNumber, resetPaging } = pagingSlice.actions;
export default pagingSlice.reducer;
