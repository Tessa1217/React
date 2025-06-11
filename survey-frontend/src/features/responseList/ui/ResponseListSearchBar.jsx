import { useState, memo, useEffect, useCallback } from 'react';

/**
 * 설문 응답 리스트 검색 및 필터 컴포넌트
 *
 * @param {string} searchKeyword - 초기 검색어
 * @param {string|boolean} hasResponded - 초기 응답 여부 필터 ('' | true | false)
 * @param {function} onSearchChange - 검색 또는 필터 변경 시 호출
 */
const ResponseListSearchBar = memo(
  ({ searchKeyword = '', hasResponded = '', onSearchChange }) => {
    const [localKeyword, setLocalKeyword] = useState(searchKeyword);

    // 외부 상태 변경 시 로컬 키워드 동기화
    useEffect(() => {
      setLocalKeyword(searchKeyword);
    }, [searchKeyword]);

    /**
     * 검색 버튼 클릭 또는 폼 제출 시 검색 실행
     */
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        onSearchChange({ hasResponded, searchKeyword: localKeyword });
      },
      [localKeyword, onSearchChange, hasResponded]
    );

    /**
     * 엔터 키 입력 시 검색 실행
     */
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSearchChange({ searchKeyword: localKeyword, hasResponded });
        }
      },
      [localKeyword, hasResponded, onSearchChange]
    );

    /**
     * 응답 여부 필터 선택 시 이벤트 핸들링
     * - string을 boolean 또는 ''으로 변환하여 전달
     */
    const handleSelectChange = useCallback(
      (e) => {
        const value = e.target.value;
        const parsed =
          value === ''
            ? ''
            : value === 'true'
            ? true
            : value === 'false'
            ? false
            : '';
        onSearchChange({
          searchKeyword: localKeyword,
          hasResponded: parsed,
        });
      },
      [localKeyword, onSearchChange]
    );

    return (
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center w-full sm:max-w-md px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition'
        >
          <input
            type='text'
            value={localKeyword}
            onChange={(e) => setLocalKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
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
          value={hasResponded}
          onChange={handleSelectChange}
          className='w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm text-gray-700 focus:outline-none hover:shadow-md transition'
        >
          <option value=''>전체</option>
          <option value='true'>응답완료</option>
          <option value='false'>미응답</option>
        </select>
      </div>
    );
  }
);
export default ResponseListSearchBar;
