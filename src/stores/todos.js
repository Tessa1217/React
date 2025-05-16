import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    input: '',
    todos: [],
    todoId: 1,
  },
  reducers: {
    changeInput: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    insert: (state) =>
      produce(state, (draft) => {
        draft.todos.push({
          id: draft.todoId,
          text: draft.input,
          done: false,
        });
        draft.todoId += 1;
        draft.input = '';
      }),
    toggle: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    remove: (state, { payload: id }) =>
      produce(state, (draft) => {
        draft.todos.splice(
          draft.todos.findIndex((todo) => todo.id === id),
          1
        );
      }),
  },
});

export const { changeInput, insert, toggle, remove } = todosSlice.actions;
export default todosSlice.reducer;
