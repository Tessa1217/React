const Paragraph = () => {
  return (
    <textarea
      disabled
      placeholder='답변을 입력하세요'
      rows={4}
      className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500'
    />
  );
};

export default Paragraph;
