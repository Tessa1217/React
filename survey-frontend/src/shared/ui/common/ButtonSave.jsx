import { memo } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
const ButtonSave = memo(
  ({ onSaveButtonClick, size = 16, isPending = false }) => {
    return (
      <button
        className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
        onClick={onSaveButtonClick}
        disabled={isPending}
      >
        <HiCheckCircle size={size} />
        {isPending ? '저장 중...' : '저장'}
      </button>
    );
  }
);
export default ButtonSave;
