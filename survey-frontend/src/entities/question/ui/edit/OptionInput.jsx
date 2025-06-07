import { memo } from 'react';
import RemoveOptionButton from '@/entities/question/ui/edit/RemoveOptionButton';

const OptionInput = memo(
  ({ qId, oId, value = '', onChange, onRemove, type = 'text' }) => {
    return (
      <label className='flex items-center space-x-2'>
        {type === 'radio' && <input type='radio' disabled />}
        {type === 'checkbox' && <input type='checkbox' disabled />}
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(qId, oId, e.target.value)}
          className='border border-gray-300 rounded px-2 py-1 flex-grow'
        />
        <RemoveOptionButton onRemoveOption={onRemove} qId={qId} oId={oId} />
      </label>
    );
  }
);

export default OptionInput;
