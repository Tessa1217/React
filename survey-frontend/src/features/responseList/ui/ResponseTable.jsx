import { memo } from 'react';
import Badge from '@/shared/ui/icon/Badge';
const ResponseTable = memo(({ responseList, onClick }) => {
  return (
    <div className='overflow-x-auto shadow-lg rounded-lg"'>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
        <thead className='bg-blue-500 text-white text-sm uppercase tracking-wider'>
          <tr>
            <th className='px-6 py-3 text-ceter'>제목</th>
            <th className='px-6 py-3 text-center'>응답 시 로그인</th>
            <th className='px-6 py-3 text-center'>만료일</th>
            <th className='px-6 py-3 text-center'>응답여부</th>
          </tr>
        </thead>
        <tbody className='text-gray-700 text-sm divide-y divide-gray-200'>
          {/* 이 부분은 반복 렌더링 */}
          {responseList.length > 0 ? (
            responseList.map((form) => (
              <tr
                key={form.id}
                className='hover:bg-gray-50'
                onClick={() => onClick(form)}
              >
                <td className='px-6 py-4 text-left'>{form.title}</td>
                <td className='px-6 py-4 text-center'>
                  {form.requiresLogin ? '필요' : '불필요'}
                </td>
                <td className='px-6 py-4 text-center'>
                  {form.expiresAt
                    ? new Date(form.expiresAt).toLocaleDateString()
                    : '없음'}
                </td>
                <td className='px-6 py-4 text-center'>
                  {form.responseId ? (
                    <Badge color='green'>응답완료</Badge>
                  ) : (
                    <Badge color='red'>미응답</Badge>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
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
});

export default ResponseTable;
