import { createSlice } from '@reduxjs/toolkit';
const auth = createSlice({
  name: 'auth',
  initialState: {
    loginUser: {
      username: '',
      loginYn: false,
    },
  },
  reducers: {
    setLoginUserInfo: (state, { payload: user }) => ({
      ...state,
      loginUser: { username: user.email, loginYn: true },
    }),
    logoutUser: (state) => ({
      ...state,
      loginUser: { username: '', loginYn: false },
    }),
  },
});
export const { setLoginUserInfo, logoutUser } = auth.actions;
export default auth.reducer;
