import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../stores/todos';
import TodoList from '../components/todo/TodoList';
import { useCallback } from 'react';

const TodoContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch]
  );

  const onInsert = useCallback(() => dispatch(insert()), [dispatch]);

  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);

  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  return (
    <TodoList
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default TodoContainer;
