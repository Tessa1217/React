import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
};

const formEditorSlice = createSlice({
  name: 'formEditor',
  initialState,
  reducers: {
    saveFormRequest: (state) => {
      state.isSaving = true;
    },
    saveFormSuccess: (state) => {
      state.isSaving = false;
    },
    saveFormFailure: (state) => {
      state.isSaving = false;
    },
  },
});

export const { saveFormRequest, saveFormSuccess, saveFormFailure } =
  formEditorSlice.actions;
export default formEditorSlice.reducer;
