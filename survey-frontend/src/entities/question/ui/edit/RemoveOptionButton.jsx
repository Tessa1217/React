import { memo } from 'react';
import FaTimesIcon from '@/shared/ui/icon/FaTimesIcon';
const RemoveOptionButton = memo(({ onRemoveOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onRemoveOption(id)}
      className='text-red-500 hover:text-red-700 cursor-pointer'
    >
      <FaTimesIcon />
    </button>
  );
});

export default RemoveOptionButton;
