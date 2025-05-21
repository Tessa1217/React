import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  formList: [],
  isLoading: false,
};

const formViewerSlice = createSlice({
  name: 'formViewer',
  initialState,
  reducers: {
    fetchFormListRequest: (state) => {
      state.isLoading = true;
    },
    fetchFormListSuccess: (state, { payload }) => {
      state.isLoading = false;
      const { data } = payload;
      const { content } = data;
      state.formList = content;
    },
    fetchFormListFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchFormListRequest,
  fetchFormListSuccess,
  fetchFormListFailure,
} = formViewerSlice.actions;
export default formViewerSlice.reducer;
