import { FaTimes } from 'react-icons/fa';
const TodoListItem = ({ todo, onToggle, onRemove }) => {
  return (
    <li className='flex items-center bg-slate-100 p-3 rounded-xl justify-between'>
      <label className='flex items-center gap-2'>
        <input
          className='accent-blue-500'
          type='checkbox'
          onClick={() => onToggle(todo.id)}
          readOnly={true}
          checked={todo.done}
        />
        <span className='text-gray-700'>{todo.text}</span>
      </label>
      <button
        className='text-red-500 hover:text-red-700 cursor-pointer'
        onClick={() => onRemove(todo.id)}
      >
        <FaTimes />
      </button>
    </li>
  );
};

export default TodoListItem;
