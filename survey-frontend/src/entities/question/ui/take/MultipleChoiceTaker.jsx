const MultipleChoiceTaker = ({
  id,
  options = [],
  onSelectedOptionChange,
  answerText = '',
  onAnswerTextChange,
}) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              name={`radio_${id}`}
              value={option.id}
              onChange={(e) =>
                onSelectedOptionChange(id, e.target.value, option.isEtc)
              }
            />
            <span>{option.optionText}</span>
            {option.isEtc && (
              <input
                id={`${id}-${option.id}-text`}
                type='text'
                value={answerText}
                onChange={(e) => onAnswerTextChange(id, e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded'
              />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};
export default MultipleChoiceTaker;
