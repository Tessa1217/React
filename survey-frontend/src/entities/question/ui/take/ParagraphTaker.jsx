const ParagraphTaker = ({ id, value, onChange }) => {
  return (
    <textarea
      id={id}
      placeholder='답변을 입력하세요.'
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      rows={4}
      className='w-full px-3 py-2 border border-gray-300 rounded'
    />
  );
};
export default ParagraphTaker;
