import React from 'react';
import RemoveOptionButton from '@/entities/question/ui/edit/RemoveOptionButton';

const OptionInput = ({ id, value, onChange, onRemove, type = 'text' }) => {
  return (
    <label className='flex items-center space-x-2'>
      {type === 'radio' && <input type='radio' disabled />}
      {type === 'checkbox' && <input type='checkbox' disabled />}
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className='border border-gray-300 rounded px-2 py-1 flex-grow'
      />
      <RemoveOptionButton onRemoveOption={onRemove} id={id} />
    </label>
  );
};

export default React.memo(OptionInput);
