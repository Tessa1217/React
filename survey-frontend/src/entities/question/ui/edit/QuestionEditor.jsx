import React from 'react';
import { FaTimes } from 'react-icons/fa';

const QuestionEditor = ({
  children,
  questionText,
  isRequired,
  onRemoveQuestion,
  handleQuestionTextChange,
  handleRequiredChange,
}) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
      {/* 질문 제목 + 필수 체크 */}
      <div className='flex justify-end'>
        <button
          onClick={onRemoveQuestion}
          className='text-gray-400 hover:text-red-600 transition-colors cursor-pointer'
          aria-label='질문 삭제'
          title='질문 삭제'
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <input
          type='text'
          placeholder='질문 제목'
          value={questionText}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          className='text-lg font-semibold w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 placeholder-gray-400 transition-all'
        />
        <label className='text-sm flex justify-items-stretch items-center ml-2 w-20'>
          <input
            type='checkbox'
            checked={isRequired}
            onChange={(e) => handleRequiredChange(e.target.checked)}
            className='mr-1 accent-blue-500'
          />
          <span className='text-gray-600 w-100'>필수</span>
        </label>
      </div>
      {children}
    </div>
  );
};

export default React.memo(QuestionEditor);
