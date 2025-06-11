// 익명 사용자 관련 유틸 함수 import
import {
  clearAnonymousId,
  createAnonymousId,
} from '@/shared/lib/anonymousUtil';
import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  accessToken: null, // JWT 액세스 토큰
  user: null, // 사용자 정보 객체
  isLoggedIn: false, // 로그인 여부
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그아웃 처리 리듀서
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      // 로그아웃 시 익명 사용자 UUID 재생성
      createAnonymousId();
    },
    // 로그인 상태 갱신 리듀서
    updateLoginStatus: (state, { payload }) => {
      const { accessToken, user } = payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isLoggedIn = true;
      // 로그인 성공 시 익명 사용자 UUID 제거
      clearAnonymousId();
    },
  },
});

export const { logout, updateLoginStatus } = authSlice.actions;
export default authSlice.reducer;
