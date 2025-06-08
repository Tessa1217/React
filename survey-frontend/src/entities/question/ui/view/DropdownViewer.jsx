import React from 'react';
const DropdownViewer = ({ id, options = [], selectedOption = '' }) => {
  console.log(selectedOption);
  return (
    <div className='space-y-2'>
      <select
        id={id}
        className='mt-2 w-full px-3 py-2 border border-gray-300 rounded'
        disabled
        value={selectedOption}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.optionText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(DropdownViewer);
