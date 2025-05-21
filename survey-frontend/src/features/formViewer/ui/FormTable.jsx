const FormTable = ({ formList, onViewButtonClick, onUpdateButtonClick }) => {
  return (
    <div className='overflow-x-auto shadow-lg rounded-lg"'>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
        <thead className='bg-blue-500 text-white text-sm uppercase tracking-wider'>
          <tr>
            <th className='px-6 py-3 text-ceter'>제목</th>
            <th className='px-6 py-3 text-center'>공개</th>
            <th className='px-6 py-3 text-center'>응답 시 로그인</th>
            <th className='px-6 py-3 text-center'>만료일</th>
            <th className='px-6 py-3 text-center'>관리</th>
          </tr>
        </thead>
        <tbody className='text-gray-700 text-sm divide-y divide-gray-200'>
          {/* 이 부분은 반복 렌더링 */}
          {formList.length > 0 ? (
            formList.map((form) => (
              <tr key={form.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 text-left'>{form.title}</td>
                <td className='px-6 py-4 text-center'>
                  {form.isPublic ? (
                    <span className='text-green-600 font-medium'>공개</span>
                  ) : (
                    <span className='text-red-500 font-medium'>비공개</span>
                  )}
                </td>
                <td className='px-6 py-4 text-center'>
                  {form.requiresLogin ? '필요' : '불필요'}
                </td>
                <td className='px-6 py-4 text-center'>
                  {form.expiresAt
                    ? new Date(form.expiresAt).toLocaleDateString()
                    : '없음'}
                </td>
                <td className='px-6 py-4 text-center space-x-2'>
                  <button
                    className='px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200 cursor-pointer'
                    onClick={() => onViewButtonClick(form.id)}
                  >
                    보기
                  </button>
                  <button
                    className='px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition duration-200 cursor-pointer'
                    onClick={() => onUpdateButtonClick(form.id)}
                  >
                    수정
                  </button>
                  <button className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-200 cursor-pointer'>
                    삭제
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className='py-10 text-center text-gray-500 bg-gray-50'
              >
                📭 조회되는 설문지가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
