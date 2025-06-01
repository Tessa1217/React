import { memo } from 'react';
import { HiEye } from 'react-icons/hi';
const ButtonView = memo(({ onViewButtonClick, size = 16 }) => {
  return (
    <button
      className='inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition cursor-pointer'
      onClick={onViewButtonClick}
    >
      <HiEye size={size} />
      보기
    </button>
  );
});
export default ButtonView;
