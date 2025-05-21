import React from 'react';
const ParagraphViewer = ({ id, mode, value, handleChange }) => {
  return (
    <textarea
      id={id}
      disabled={mode === 'view'}
      placeholder='답변을 입력하세요.'
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      rows={4}
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};

export default React.memo(ParagraphViewer);
