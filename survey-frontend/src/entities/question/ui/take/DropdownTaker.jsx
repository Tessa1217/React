const DropdownTaker = ({
  id,
  options = [],
  selectedOption,
  onSelectedOptionChange,
}) => {
  return (
    <div className='space-y-2'>
      <select
        id={id}
        className='mt-2 w-full px-3 py-2 border border-gray-300 rounded'
        value={selectedOption?.[0].optionId}
        onChange={(e) => onSelectedOptionChange(id, e.target.value)}
      >
        <option>선택해주세요.</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.optionText}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropdownTaker;
