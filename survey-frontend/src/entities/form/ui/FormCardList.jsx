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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {formList.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
              expiresAt={form.expiresAt}
              isLoggedIn={isLoggedIn}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </section>
    );
  }
);
export default FormCardList;
