import React from 'react';
const MultipleChoiceViewer = ({ options, selectedOption }) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <input
            type='radio'
            disabled
            checked={selectedOption === option.id}
            value={option.id}
          />
          <span>{option.optionText}</span>
        </label>
      ))}
    </div>
  );
};

export default React.memo(MultipleChoiceViewer);
