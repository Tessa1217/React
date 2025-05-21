import { FaTimes } from 'react-icons/fa';
const RemoveOptionButton = ({ onRemoveOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onRemoveOption(id)}
      className='text-red-500 hover:text-red-700 cursor-pointer'
    >
      <FaTimes />
    </button>
  );
};

export default RemoveOptionButton;
