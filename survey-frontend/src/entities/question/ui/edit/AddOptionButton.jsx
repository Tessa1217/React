import { memo } from 'react';
const AddOptionButton = memo(({ onAddOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onAddOption(id)}
      className='text-blue-600 hover:underline mt-2'
    >
      + 옵션 추가
    </button>
  );
});

export default AddOptionButton;
