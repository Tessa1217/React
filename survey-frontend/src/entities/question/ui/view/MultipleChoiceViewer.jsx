const MultipleChoiceViewer = ({ options, mode, value, handleChange }) => {
  return (
    <div className='space-y-2'>
      {options.map((option) => (
        <label key={option.id} className='flex items-center space-x-2'>
          <input
            type='radio'
            disabled={mode === 'view'}
            checked={value === option.id}
            value={option.id}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span>{option.optionText}</span>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceViewer;
