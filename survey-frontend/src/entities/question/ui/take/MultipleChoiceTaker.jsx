const MultipleChoiceTaker = ({ id, options = [], value, onChange }) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <input
            type='radio'
            disabled
            checked={value === option.id}
            value={option.id}
            onChange={(e) => onChange(id, e.target.value)}
          />
          <span>{option.optionText}</span>
        </label>
      ))}
    </div>
  );
};
export default MultipleChoiceTaker;
