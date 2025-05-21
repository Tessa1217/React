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
    setForm: (state, { payload: form }) => {
      Object.assign(state, form);
    },
    resetForm: () => initialState,
  },
});

export const { changeValue, resetForm, setForm } = formSlice.actions;
export default formSlice.reducer;
