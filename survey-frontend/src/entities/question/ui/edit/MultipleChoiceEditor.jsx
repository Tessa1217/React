import { memo } from 'react';
import OptionBaseEditor from '@/entities/question/ui/edit/OptionBaseEditor';

const MultipleChoiceEditor = memo(
  ({ id, options = [], handleOptionChange, onRemoveOption, onAddOption }) => {
    return (
      <OptionBaseEditor
        id={id}
        options={options}
        handleOptionChange={handleOptionChange}
        onRemoveOption={onRemoveOption}
        onAddOption={onAddOption}
        type='radio'
      />
    );
  }
);

export default MultipleChoiceEditor;
