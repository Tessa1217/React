import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  formList: [],
  form: {},
  isLoading: false,
};

const formViewerSlice = createSlice({
  name: 'formViewer',
  initialState,
  reducers: {
    fetchFormListRequest: (state, action) => {
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
    fetchFormRequest: (state, { payload }) => {
      state.isLoading = true;
    },
    fetchFormSuccess: (state, { payload }) => {
      state.isLoading = false;
      const { data } = payload;
      state.form = data;
    },
    fetchFormFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchFormListRequest,
  fetchFormListSuccess,
  fetchFormListFailure,
  fetchFormRequest,
  fetchFormSuccess,
  fetchFormFailure,
} = formViewerSlice.actions;
export default formViewerSlice.reducer;

// formViewer.saga.js
// import { setPaging } from '@/shared/model/paging.slice';

// function* fetchFormListSaga(action) {
//   try {
//     const data = yield call(api.fetchFormList, action.payload);
//     yield put(fetchFormListSuccess(data));
//     yield put(setPaging({ key: 'formViewer', paging: {
//       page: data.page,
//       size: data.size,
//       totalPages: data.totalPages,
//     }}));
//   } catch (e) {
//     yield put(fetchFormListFailure());
//   }
// }
