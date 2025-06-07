const CheckboxTaker = ({
  id,
  options = [],
  selectedOption = [],
  onSelectedOptionsChange,
}) => {
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
            checked={selectedOption.includes(option.id)}
            onChange={(e) =>
              onSelectedOptionsChange(id, option.id, e.target.checked)
            }
            className='accent-blue-600 w-4 h-4'
          />
          <span className='text-gray-800'>{option.optionText}</span>
        </label>
      ))}
    </div>
  );
};
export default CheckboxTaker;
