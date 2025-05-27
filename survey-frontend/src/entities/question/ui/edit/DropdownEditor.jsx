import { memo } from 'react';
import OptionInput from '@/entities/question/ui/edit/OptionInput';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';

const DropdownEditor = ({
  id,
  options,
  handleOptionChange,
  onRemoveOption,
  onAddOption,
}) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <OptionInput
          key={option.id}
          id={option.id}
          value={option.optionText}
          onChange={handleOptionChange}
          onRemove={onRemoveOption}
        />
      ))}
      <AddOptionButton onAddOption={onAddOption} id={id} />
    </div>
  );
};

export default memo(DropdownEditor);
