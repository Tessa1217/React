// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import * as api from '../lib/api';
// import { produce } from 'immer';

// export const fetchPost = createAsyncThunk('api/fetchPost', async (id) => {
//   const response = await api.getPost(id);
//   return response.data;
// });

// export const fetchUsers = createAsyncThunk('api/fetchUsers', async () => {
//   const response = await api.getUsers();
//   return response.data;
// });

// const apiReducer = createSlice({
//   name: 'api',
//   initialState: {
//     loading: {
//       GET_POST: false,
//       GET_USERS: false,
//     },
//     post: {},
//     users: [],
//   },
//   reducer: {},
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPost.pending, (state) => {
//         state.loading.GET_POST = true;
//       })
//       .addCase(fetchPost.fulfilled, (state, { payload: post }) => {
//         state.loading.GET_POST = false;
//         state.post = post;
//       })
//       .addCase(fetchPost.rejected, (state) => {
//         state.loading.GET_POST = false;
//       })
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading.GET_USERS = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, { payload: users }) => {
//         state.loading.GET_USERS = false;
//         state.users = users;
//       })
//       .addCase(fetchUsers.rejected, (state) => {
//         state.loading.GET_USERS = false;
//       });
//   },
// });

// export default apiReducer.reducer;
