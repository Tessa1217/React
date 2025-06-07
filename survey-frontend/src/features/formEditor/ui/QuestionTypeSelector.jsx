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
    <div className='bg-white rounded-xl shadow p-4 space-y-4'>
      <div className='flex flex-col space-y-3'>
        <label className='text-sm font-medium text-gray-700'>
          질문 유형 선택
        </label>
        <select
          value={type}
          onChange={(e) => onChange(e.target.value)}
          className='border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <button
          className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition cursor-pointer'
          onClick={() => onAddQuestion(type)}
        >
          <FaCirclePlus />
          질문 추가
        </button>
      </div>
    </div>
  );
};

export default React.memo(QuestionTypeSelector);
