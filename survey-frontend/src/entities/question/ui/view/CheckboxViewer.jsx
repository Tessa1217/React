import React from 'react';
const CheckboxViewer = ({
  id,
  answerText,
  options = [],
  selectedOption = [],
}) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={`${id}-${option.id}`}
          className='flex items-center space-x-2 cursor-pointer'
        >
          <div className='flex gap-2 items-center'>
            <input
              id={`${id}-${option.id}`}
              type='checkbox'
              disabled
              checked={selectedOption.includes(option.id)}
              className='accent-blue-600 w-4 h-4'
            />
            <span className='text-gray-800'>{option.optionText}</span>
            {option.isEtc && (
              <input
                id={`${id}-${option.id}-text`}
                type='text'
                value={answerText}
                disasbled
                className='px-3 py-2 border border-gray-300 rounded'
              />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default React.memo(CheckboxViewer);
