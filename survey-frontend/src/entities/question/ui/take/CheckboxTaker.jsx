const CheckboxTaker = ({
  id,
  options = [],
  selectedOption = [],
  onSelectedOptionsChange,
  answerText,
  onAnswerTextChange,
}) => {
  return (
    <div className='space-y-2'>
      {options &&
        options.map((option) => (
          <label
            key={option.id}
            htmlFor={`${id}-${option.id}`}
            className='flex items-center space-x-2 cursor-pointer'
          >
            <div className='flex gap-2 items-center'>
              <input
                id={`${id}-${option.id}`}
                type='checkbox'
                checked={selectedOption
                  .map((o) => o.optionId)
                  .includes(option.id)}
                onChange={(e) =>
                  onSelectedOptionsChange(
                    id,
                    option.id,
                    e.target.checked,
                    option.isEtc
                  )
                }
                className='accent-blue-600 w-4 h-4'
              />
              <span className='text-gray-800'>{option.optionText}</span>
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
export default CheckboxTaker;
