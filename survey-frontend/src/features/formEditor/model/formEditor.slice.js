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
    updateFormRequest: (state) => {
      state.isSaving = true;
    },
    updateFormSuccess: (state) => {
      state.isSaving = false;
    },
    updateFormFailure: (state) => {
      state.isSaving = false;
    },
  },
});

export const {
  saveFormRequest,
  saveFormSuccess,
  saveFormFailure,
  updateFormRequest,
  updateFormSuccess,
  updateFormFailure,
} = formEditorSlice.actions;
export default formEditorSlice.reducer;
