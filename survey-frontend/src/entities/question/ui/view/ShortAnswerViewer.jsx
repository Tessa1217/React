import React from 'react';
const ShortAnswerViewer = ({ value = '' }) => {
  return (
    <input
      type='text'
      placeholder='답변을 입력하세요'
      value={value}
      disabled
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};

export default React.memo(ShortAnswerViewer);
