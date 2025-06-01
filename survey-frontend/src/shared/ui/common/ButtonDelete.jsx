import { memo } from 'react';
import { HiTrash } from 'react-icons/hi';
const ButtonDelete = memo(({ onDeleteButtonClick }) => {
  return (
    <button
      className='inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition cursor-pointer'
      onClick={onDeleteButtonClick}
    >
      <HiTrash size={16} />
      삭제
    </button>
  );
});
export default ButtonDelete;
