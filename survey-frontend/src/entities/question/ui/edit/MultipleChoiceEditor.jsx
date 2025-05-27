import { memo } from 'react';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';
import OptionInput from '@/entities/question/ui/edit/OptionInput';

const MultipleChoiceEditor = memo(
  ({ id, options = [], handleOptionChange, onRemoveOption, onAddOption }) => {
    return (
      <div className='space-y-2'>
        {options.map((option) => (
          <OptionInput
            key={option.id}
            id={option.id}
            value={option.optionText}
            onChange={handleOptionChange}
            onRemove={onRemoveOption}
            type='radio'
          />
        ))}
        <AddOptionButton onAddOption={onAddOption} id={id} />
      </div>
    );
  }
);

export default MultipleChoiceEditor;
