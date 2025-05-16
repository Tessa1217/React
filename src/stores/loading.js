import { createSlice } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'loading',
  initialState: { loading: false },
  reducers: {
    startLoading: (state) => (state.loading = true),
    finishLoading: (state) => (state.loading = false),
  },
});

export const { startLoading, finishLoading } = loading.actions;
export default loading.reducer;
