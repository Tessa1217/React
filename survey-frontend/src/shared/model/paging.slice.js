import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setPaging: (state, { payload }) => {
      const { key, paging } = payload;
      state[key] = { ...state[key], ...paging };
    },
    resetPaging: (state, { payload: key }) => {
      delete state[key];
    },
  },
});

export const { setPaging, resetPaging } = pagingSlice.actions;
export default pagingSlice.reducer;
