import OptionInput from '@/entities/question/ui/edit/OptionInput';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';
import { memo } from 'react';
const OptionBaseEditor = memo(
  ({ id, options, type, handleOptionChange, onAddOption, onRemoveOption }) => {
    return (
      <div className='space-y-2'>
        {options.map((option) => (
          <OptionInput
            key={option.id}
            qId={id}
            oId={option.id}
            value={option.optionText}
            onChange={handleOptionChange}
            onRemove={onRemoveOption}
            type={type}
          />
        ))}
        <AddOptionButton onAddOption={onAddOption} id={id} />
      </div>
    );
  }
);
export default OptionBaseEditor;
