import { memo } from 'react';
import { HiPencil } from 'react-icons/hi';
const ButtonUpdate = memo(({ onUpdateButtonClick, size = 16 }) => {
  return (
    <button
      className='inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition cursor-pointer'
      onClick={onUpdateButtonClick}
    >
      <HiPencil size={size} />
      수정
    </button>
  );
});
export default ButtonUpdate;
