import { FaTimes } from 'react-icons/fa';
const QuestionCard = ({
  children,
  questionText,
  required,
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
            checked={required}
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

const ShortAnswer = () => {
  return (
    <input
      type='text'
      disabled
      placeholder='답변을 입력하세요'
      className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500'
    />
  );
};

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

const RemoveOptionButton = ({ onRemoveOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onRemoveOption(id)}
      className='text-red-500 hover:text-red-700 cursor-pointer'
    >
      <FaTimes />
    </button>
  );
};

const AddOptionButton = ({ onAddOption, id }) => {
  return (
    <button
      type='button'
      onClick={() => onAddOption(id)}
      className='text-blue-600 hover:underline mt-2'
    >
      + 옵션 추가
    </button>
  );
};

const MultipleChoice = ({
  id,
  options,
  handleOptionChange,
  onRemoveOption,
  onAddOption,
}) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <input type='radio' disabled />
          <input
            type='text'
            value={option.optionText}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className='border border-gray-300 rounded px-2 py-1 flex-grow'
          />
          <RemoveOptionButton onRemoveOption={onRemoveOption} id={option.id} />
        </label>
      ))}
      <AddOptionButton onAddOption={onAddOption} id={id} />
    </div>
  );
};

const Checkbox = ({
  id,
  options,
  handleOptionChange,
  onRemoveOption,
  onAddOption,
}) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <input type='checkbox' disabled />
          <input
            type='text'
            value={option.optionText}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            className='border border-gray-300 rounded px-2 py-1 flex-grow'
          />
          <RemoveOptionButton onRemoveOption={onRemoveOption} id={option.id} />
        </label>
      ))}
      <AddOptionButton onAddOption={onAddOption} id={id} />
    </div>
  );
};

const Dropdown = ({
  id,
  options,
  handleOptionChange,
  onRemoveOption,
  onAddOption,
}) => {
  return (
    <div>
      <div className='space-y-2'>
        {options.map((option) => (
          <label key={option.id} className='flex items-center space-x-2'>
            <input
              type='text'
              value={option.optionText}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className='border border-gray-300 rounded px-2 py-1 flex-grow'
            />
            <RemoveOptionButton
              onRemoveOption={onRemoveOption}
              id={option.id}
            />
          </label>
        ))}
        <AddOptionButton onAddOption={onAddOption} id={id} />
      </div>
      <select className='mt-2 w-full px-3 py-2 border border-gray-300 rounded text-gray-500'>
        {options.map((option) => (
          <option key={option.id} value={option.optionOrder}>
            {option.optionText}
          </option>
        ))}
      </select>
    </div>
  );
};

const EditableQuestionCard = ({
  id,
  questionText,
  required,
  type,
  options = [],
  onRemoveQuestion,
  handleQuestionTextChange,
  handleRequiredChange,
  handleOptionChange,
  onAddOption,
  onRemoveOption,
}) => {
  const questionType = () => {
    switch (type) {
      case 'short_text':
        return <ShortAnswer />;
      case 'checkbox':
        return (
          <Checkbox
            id={id}
            options={options}
            handleOptionChange={handleOptionChange}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoice
            id={id}
            options={options}
            handleOptionChange={handleOptionChange}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
          />
        );
      case 'dropdown':
        return (
          <Dropdown
            options={options}
            handleOptionChange={handleOptionChange}
            onAddOption={onAddOption}
            onRemoveOption={onRemoveOption}
          />
        );
      case 'paragraph':
        return <Paragraph />;
      default:
        return <ShortAnswer />;
    }
  };
  return (
    <QuestionCard
      questionText={questionText}
      required={required}
      onRemoveQuestion={onRemoveQuestion}
      handleQuestionTextChange={handleQuestionTextChange}
      handleRequiredChange={handleRequiredChange}
    >
      {questionType()}
    </QuestionCard>
  );
};

export default EditableQuestionCard;
