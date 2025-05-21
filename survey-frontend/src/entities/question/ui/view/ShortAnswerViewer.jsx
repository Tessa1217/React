const ShortAnswerViewer = ({ value, mode, handleChange }) => {
  return (
    <input
      type='text'
      disabled={mode === 'view'}
      placeholder='답변을 입력하세요'
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};

export default ShortAnswerViewer;
