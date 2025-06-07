const ShortAnswerTaker = ({ id, answerText, onAnswerTextChange }) => {
  return (
    <input
      type='text'
      placeholder='답변을 입력하세요'
      value={answerText}
      onChange={(e) => onAnswerTextChange(id, e.target.value)}
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};
export default ShortAnswerTaker;
