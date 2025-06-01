import { memo } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
const ButtonInsert = memo(({ onInsertButtonClick, size = 16 }) => {
  return (
    <button
      className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
      onClick={onInsertButtonClick}
    >
      등록 <HiCheckCircle size={size} />
    </button>
  );
});
export default ButtonInsert;
