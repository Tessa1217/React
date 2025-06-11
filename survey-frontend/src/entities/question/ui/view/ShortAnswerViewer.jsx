import React from 'react';
const ShortAnswerViewer = ({ answerText = '' }) => {
  return (
    <input
      type='text'
      placeholder='답변을 입력하세요'
      value={answerText}
      disabled
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};

export default React.memo(ShortAnswerViewer);
