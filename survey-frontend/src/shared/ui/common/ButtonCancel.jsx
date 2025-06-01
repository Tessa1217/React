import { memo } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
const ButtonCancel = memo(({ onCancelButtonClick, size = 16 }) => {
  return (
    <button
      className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition cursor-pointer'
      onClick={onCancelButtonClick}
    >
      <FaTimesCircle size={size} />
      취소
    </button>
  );
});
export default ButtonCancel;
