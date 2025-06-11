import React from 'react';
const ParagraphViewer = ({ id, answerText = '' }) => {
  return (
    <textarea
      id={id}
      placeholder='답변을 입력하세요.'
      value={answerText}
      rows={4}
      disabled
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};

export default React.memo(ParagraphViewer);
