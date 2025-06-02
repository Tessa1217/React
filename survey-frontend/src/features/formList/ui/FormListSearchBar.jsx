import { useState, memo, useEffect, useCallback } from 'react';
const FormListSearchBar = memo(
  ({ searchKeyword = '', searchFilter = 'all', onSearchChange }) => {
    const [localKeyword, setLocalKeyword] = useState(searchKeyword);

    useEffect(() => {
      setLocalKeyword(searchKeyword);
    }, [searchKeyword]);

    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        onSearchChange({ searchFilter, searchKeyword: localKeyword });
      },
      [localKeyword, onSearchChange, searchFilter]
    );

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSearchChange({ searchKeyword: localKeyword, searchFilter });
        }
      },
      [localKeyword, searchFilter, onSearchChange]
    );

    return (
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex items-center w-full sm:max-w-md px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition'
        >
          <input
            type='text'
            value={localKeyword}
            onChange={(e) => setLocalKeyword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder='설문 제목을 검색하세요...'
            className='flex-grow px-3 py-2 text-sm text-gray-700 bg-transparent focus:outline-none'
          />
          <button
            type='submit'
            className='ml-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition cursor-pointer'
          >
            검색
          </button>
        </form>

        <select
          value={searchFilter}
          onChange={(e) =>
            onSearchChange({
              searchKeyword: localKeyword,
              searchFilter: e.target.value,
            })
          }
          className='w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm text-gray-700 focus:outline-none hover:shadow-md transition'
        >
          <option value='all'>전체</option>
          <option value='public'>공개</option>
          <option value='private'>비공개</option>
        </select>
      </div>
    );
  }
);
export default FormListSearchBar;
