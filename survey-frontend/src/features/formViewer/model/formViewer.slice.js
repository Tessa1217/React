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
    fetchFormListRequest: (state, { payload }) => {
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
