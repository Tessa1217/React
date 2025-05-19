import { createSlice } from '@reduxjs/toolkit';

// 설문지 초기 상태
const initialState = {
  title: '',
  description: '',
  isPublic: true,
  requiresLogin: false,
  expiresAt: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeValue: (state, action) => {
      const { id, value } = action.payload;
      state[id] = value;
    },
  },
});

export const { changeValue } = formSlice.actions;
export default formSlice.reducer;
