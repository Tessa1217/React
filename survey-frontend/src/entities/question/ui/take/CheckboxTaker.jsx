const CheckboxTaker = ({ id, options = [], selected = [], onChange }) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={`${id}-${option.id}`}
          className='flex items-center space-x-2 cursor-pointer'
        >
          <input
            id={`${id}-${option.id}`}
            type='checkbox'
            disabled
            checked={selected.includes(option.id)}
            onChange={() => onChange(id, option.id)}
            className='accent-blue-600 w-4 h-4'
          />
          <span className='text-gray-800'>{option.optionText}</span>
        </label>
      ))}
    </div>
  );
};
export default CheckboxTaker;
