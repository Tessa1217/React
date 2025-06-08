import { memo } from 'react';
import RemoveOptionButton from '@/entities/question/ui/edit/RemoveOptionButton';

const OptionInput = memo(
  ({ qId, oId, isEtc, value = '', onChange, onRemove, type = 'text' }) => {
    return (
      <label className='flex items-center space-x-2'>
        {type === 'radio' && <input type='radio' disabled />}
        {type === 'checkbox' && <input type='checkbox' disabled />}
        {isEtc ? (
          <input
            type='text'
            disabled
            value={value}
            className='border border-gray-300 bg-gray-50 rounded px-2 py-1 flex-grow'
          />
        ) : (
          <input
            type='text'
            value={value}
            onChange={(e) => onChange(qId, oId, e.target.value)}
            className='border border-gray-300 rounded px-2 py-1 flex-grow'
          />
        )}

        <RemoveOptionButton onRemoveOption={onRemove} qId={qId} oId={oId} />
      </label>
    );
  }
);

export default OptionInput;
