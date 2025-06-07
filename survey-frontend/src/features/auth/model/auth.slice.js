import {
  clearAnonymousId,
  createAnonymousId,
} from '@/shared/lib/anonymousUtil';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      // UUID 재생성
      createAnonymousId;
    },
    updateLoginStatus: (state, { payload }) => {
      const { accessToken, user } = payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isLoggedIn = true;
      // UUID 제거
      clearAnonymousId();
    },
  },
});

export const { logout, updateLoginStatus } = authSlice.actions;
export default authSlice.reducer;
