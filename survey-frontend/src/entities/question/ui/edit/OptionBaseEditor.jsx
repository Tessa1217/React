import OptionInput from '@/entities/question/ui/edit/OptionInput';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';
import { memo } from 'react';
import AddOptionButtonGroup from '@/entities/question/ui/edit/AddOptionButtonGroup';
const OptionBaseEditor = memo(
  ({ id, options, type, handleOptionChange, onAddOption, onRemoveOption }) => {
    return (
      <div className='space-y-2'>
        {options.map((option) => (
          <OptionInput
            key={option.id}
            qId={id}
            oId={option.id}
            isEtc={option.isEtc}
            value={option.optionText}
            onChange={handleOptionChange}
            onRemove={onRemoveOption}
            type={type}
          />
        ))}
        {type === 'DROPDOWN' ? (
          <AddOptionButton onAddOption={onAddOption} id={id} />
        ) : (
          <AddOptionButtonGroup id={id} onAddOption={onAddOption} />
        )}
      </div>
    );
  }
);
export default OptionBaseEditor;
