import { memo } from 'react';
import FormCard from '@/entities/form/ui/FormCard';
const FormCardList = memo(
  ({ cardTitle, onMoreBtnClick, onCardClick, formList, isLoggedIn }) => {
    return (
      <section className='bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 space-y-5 mb-8 transition-all'>
        <header className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>{cardTitle}</h2>
          <button
            onClick={onMoreBtnClick}
            className='text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition cursor-pointer'
          >
            더보기 →
          </button>
        </header>

        {formList.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {formList.map((form) => (
              <FormCard
                key={form.id}
                id={form.id}
                responseId={form?.responseId}
                title={form.title}
                description={form.description}
                expiresAt={form.expiresAt}
                isLoggedIn={isLoggedIn}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center py-12 text-gray-500'>
            <span className='text-2xl mb-2'>📭</span>
            <p className='text-lg'>조회되는 설문지가 없습니다.</p>
          </div>
        )}
      </section>
    );
  }
);
export default FormCardList;
