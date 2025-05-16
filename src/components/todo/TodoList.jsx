import TodoListItem from './TodoListItem';

const TodoList = ({
  input,
  onChangeInput,
  onInsert,
  todos,
  onToggle,
  onRemove,
}) => {
  return (
    <div className='bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4'>
      <h1 className='text-2xl font-semibold text-gray-800 text-center'>
        My To-Do List
      </h1>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Add Your Todo'
          className='flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition'
          onClick={() => onInsert()}
        >
          Add
        </button>
      </div>
      <ul className='space-y-2 max-h-60 overflow-y-auto'>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
