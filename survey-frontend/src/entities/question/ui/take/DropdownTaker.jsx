const DropdownTaker = ({ id, options = [], value, onChange }) => {
  return (
    <div className='space-y-2'>
      <select
        id={id}
        className='mt-2 w-full px-3 py-2 border border-gray-300 rounded'
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.optionOrder}>
            {option.optionText}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropdownTaker;
