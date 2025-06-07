import { memo } from 'react';
import ButtonView from '@/shared/ui/common/ButtonView';
import ButtonUpdate from '@/shared/ui/common/ButtonUpdate';
import ButtonDelete from '@/shared/ui/common/ButtonDelete';

const FormTable = memo(
  ({
    formList,
    onViewButtonClick,
    onUpdateButtonClick,
    onDeleteButtonClick,
  }) => {
    return (
      <div className='overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-blue-600 text-white'>
            <tr>
              <th className='px-6 py-3 text-left text-md font-semibold'>
                제목
              </th>
              <th className='px-6 py-3 text-center text-md font-semibold'>
                공개
              </th>
              <th className='px-6 py-3 text-center text-md font-semibold'>
                응답 시 로그인
              </th>
              <th className='px-6 py-3 text-center text-md font-semibold'>
                만료일
              </th>
              <th className='px-6 py-3 text-center text-md font-semibold'>
                관리
              </th>
            </tr>
          </thead>
          <tbody className='text-md text-gray-700 divide-y divide-gray-100'>
            {formList.length > 0 ? (
              formList.map((form) => (
                <tr key={form.id} className='hover:bg-gray-50 transition'>
                  <td className='px-6 py-4'>{form.title}</td>
                  <td className='px-6 py-4 text-center'>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        form.isPublic
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {form.isPublic ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {form.requiresLogin ? '필요' : '불필요'}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {form.expiresAt
                      ? new Date(form.expiresAt).toLocaleDateString()
                      : '없음'}
                  </td>
                  <td className='px-6 py-4 text-center space-x-1'>
                    <ButtonView
                      onViewButtonClick={() => onViewButtonClick(form.id)}
                    />
                    {form.hasResponse && (
                      <>
                        <ButtonUpdate
                          onUpdateButtonClick={() =>
                            onUpdateButtonClick(form.id)
                          }
                        />
                        <ButtonDelete
                          disabled={form.hasResponse}
                          onDeleteButtonClick={() =>
                            onDeleteButtonClick(form.id)
                          }
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                    <span className='text-2xl mb-2'>📭</span>
                    <p className='text-sm'>조회되는 설문지가 없습니다.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default FormTable;
