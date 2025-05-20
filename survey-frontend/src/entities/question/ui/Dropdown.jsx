import RemoveOptionButton from '@/entities/question/ui/RemoveOptionButton';
import AddOptionButton from '@/entities/question/ui/AddOptionButton';

const Dropdown = ({
  id,
  options,
  handleOptionChange,
  onRemoveOption,
  onAddOption,
}) => {
  return (
    <div>
      <div className='space-y-2'>
        {options.map((option) => (
          <label key={option.id} className='flex items-center space-x-2'>
            <input
              type='text'
              value={option.optionText}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className='border border-gray-300 rounded px-2 py-1 flex-grow'
            />
            <RemoveOptionButton
              onRemoveOption={onRemoveOption}
              id={option.id}
            />
          </label>
        ))}
        <AddOptionButton onAddOption={onAddOption} id={id} />
      </div>
      <select className='mt-2 w-full px-3 py-2 border border-gray-300 rounded text-gray-500'>
        {options.map((option) => (
          <option key={option.id} value={option.optionOrder}>
            {option.optionText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
