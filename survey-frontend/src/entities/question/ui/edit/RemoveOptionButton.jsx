import { memo } from 'react';
import FaTimesIcon from '@/shared/ui/icon/FaTimesIcon';
const RemoveOptionButton = memo(({ onRemoveOption, qId, oId }) => {
  return (
    <button
      type='button'
      onClick={() => onRemoveOption(qId, oId)}
      className='text-red-500 hover:text-red-700 cursor-pointer'
    >
      <FaTimesIcon />
    </button>
  );
});

export default RemoveOptionButton;
