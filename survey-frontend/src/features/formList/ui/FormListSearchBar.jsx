import { useState, memo, useEffect, useCallback } from 'react';

/**
 * 설문 검색바 컴포넌트
 *
 * @param {string} searchKeyword - 외부에서 주입되는 검색 키워드
 * @param {string} searchFilter - 외부에서 주입되는 필터 값 ('all', 'public', 'private')
 * @param {function} onSearchChange - 검색 또는 필터 변경 시 호출되는 콜백
 */
const FormListSearchBar = memo(
  ({ searchKeyword = '', searchFilter = 'all', onSearchChange }) => {
    const [localKeyword, setLocalKeyword] = useState(searchKeyword);

    // 외부 검색어가 변경되면 내부 상태도 동기화
    useEffect(() => {
      setLocalKeyword(searchKeyword);
    }, [searchKeyword]);

    /**
     * 검색 버튼 또는 폼 제출 시 검색 요청 수행
     */
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        onSearchChange({ searchFilter, searchKeyword: localKeyword });
      },
      [localKeyword, onSearchChange, searchFilter]
    );

    /**
     * 키보드 엔터 입력 시 검색 수행
     */
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
