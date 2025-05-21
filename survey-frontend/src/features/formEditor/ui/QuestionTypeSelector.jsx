import React from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
const QuestionTypeSelector = ({ type, onChange, onAddQuestion }) => {
  const options = [
    { id: 1, name: '단답형', value: 'SHORT_ANSWER' },
    { id: 2, name: '장문형', value: 'PARAGRAPH' },
    { id: 3, name: '객관식', value: 'MULTIPLE_CHOICE' },
    { id: 4, name: '체크박스', value: 'CHECKBOX' },
    { id: 5, name: '드롭다운', value: 'DROPDOWN' },
  ];

  return (
    <div className='absolute right-0 top-10 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 w-64 z-40'>
      <div className='flex flex-col gap-3'>
        <select
          value={type}
          onChange={(e) => onChange(e.target.value)}
          className='border px-2 py-1 rounded'
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <button
          className='flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition'
          onClick={onAddQuestion}
        >
          <FaCirclePlus /> 질문 추가
        </button>
      </div>
    </div>
  );
};

export default React.memo(QuestionTypeSelector);
