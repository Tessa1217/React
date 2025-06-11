import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // 로딩 시작 액션: loading 값을 true로 설정
    startLoading: (state) => {
      state.loading = true;
    },
    // 로딩 종료 액션: loading 값을 false로 설정
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
