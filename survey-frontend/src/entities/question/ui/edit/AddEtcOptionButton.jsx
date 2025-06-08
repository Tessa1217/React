import { memo } from 'react';

const AddEtcOptionButton = memo(({ id, onAddEtcOption }) => {
  return (
    <button
      type='button'
      onClick={() => onAddEtcOption(id, true)}
      className='text-blue-600 hover:underline mt-2 cursor-pointer'
    >
      + 기타 추가
    </button>
  );
});
export default AddEtcOptionButton;
