import { createSlice } from '@reduxjs/toolkit';
import parseJwt from '@/features/auth/lib/jwt';

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
  isRequesting: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sendLoginRequest: (state) => {
      state.isRequesting = true;
    },
    sendLoginSuccess: (state, { payload }) => {
      const { data } = payload;
      state.accessToken = data;
      state.user = parseJwt(data);
      state.isLoggedIn = true;
      state.isRequesting = false;
    },
    sendLoginFailure: (state) => {
      state.isRequesting = false;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    sendSignUpRequest: (state) => {
      state.isRequesting = true;
    },
    sendSignUpSuccess: (state) => {
      state.isRequesting = false;
    },
    sendSignUpFailure: (state) => {
      state.isRequesting = false;
    },
  },
});

export const {
  sendLoginRequest,
  sendLoginSuccess,
  sendLoginFailure,
  logout,
  sendSignUpRequest,
  sendSignUpSuccess,
  sendSignUpFailure,
} = authSlice.actions;
export default authSlice.reducer;
