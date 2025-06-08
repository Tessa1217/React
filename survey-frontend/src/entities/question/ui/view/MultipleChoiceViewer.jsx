import React from 'react';
const MultipleChoiceViewer = ({ id, answerText, options, selectedOption }) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label
          key={`${id}-${option.id}`}
          htmlFor={`${id}-${option.id}`}
          className='flex items-center space-x-2'
        >
          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              disabled
              id={`${id}-${option.id}`}
              checked={selectedOption === option.id}
              value={option.id}
            />
            <span>{option.optionText}</span>
            {option.isEtc && (
              <input
                id={`${id}-${option.id}-text`}
                type='text'
                value={answerText}
                disabled
                className='px-3 py-2 border border-gray-300 rounded'
              />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default React.memo(MultipleChoiceViewer);
