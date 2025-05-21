import React from 'react';
import RemoveOptionButton from '@/entities/question/ui/edit/RemoveOptionButton';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';

const CheckboxEditor = ({
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

export default React.memo(CheckboxEditor);
