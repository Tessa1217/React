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
    <div className='p-6 flex justify-end-safe items-center gap-2 mb-4 w-full max-w-3xl mx-auto'>
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
        className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition'
        onClick={() => onAddQuestion()}
      >
        <FaCirclePlus />
      </button>
    </div>
  );
};

export default QuestionTypeSelector;
