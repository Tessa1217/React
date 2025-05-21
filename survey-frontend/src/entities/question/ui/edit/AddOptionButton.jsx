import React from 'react';
const AddOptionButton = ({ onAddOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onAddOption(id)}
      className='text-blue-600 hover:underline mt-2'
    >
      + 옵션 추가
    </button>
  );
};

export default React.memo(AddOptionButton);
