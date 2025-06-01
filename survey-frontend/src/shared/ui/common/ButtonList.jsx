import { memo } from 'react';
import { FaListUl } from 'react-icons/fa';
const ButtonList = memo(({ onListButtonClick, size = 16 }) => {
  return (
    <button
      className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition  cursor-pointer'
      onClick={onListButtonClick}
    >
      <FaListUl size={size} />
      목록
    </button>
  );
});
export default ButtonList;
