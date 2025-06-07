import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentlyLoggedIn } from '@/features/auth/model/auth.selector';
import { fetchFormList } from '@/features/formList/model/formList.api';
import { fetchResponseList } from '@/features/responseList/model/responseList.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormCardList from '@/entities/form/ui/FormCardList';
const MainPage = memo(() => {
  const loggedIn = useSelector(currentlyLoggedIn);
  const navigate = useNavigate();

  const fetchFormQueryFn = useCallback(async () => {
    const { data } = await fetchFormList({ currentPage: 0, limit: 6 });
    const { items } = data;
    return items;
  }, []);

  const fetchResponseQueryFn = useCallback(async () => {
    const { data } = await fetchResponseList({ currentPage: 0, limit: 6 });
    const { items } = data;
    return items;
  }, []);

  const { data: formListResponse } = useAppQuery(
    ['mainFormList'],
    fetchFormQueryFn,
    {
      enabled: !!loggedIn,
    }
  );

  const { data: responseListResponse } = useAppQuery(
    ['mainResponseList'],
    fetchResponseQueryFn
  );

  const handleResponseCardClick = useCallback(
    (id, responseId) => {
      console.log(responseId);
      if (responseId) {
        navigate(`/responses/${responseId}`);
      } else {
        navigate(`/responses/take/${id}`);
      }
    },
    [navigate]
  );

  const formList = formListResponse || [];

  const responseList = responseListResponse || [];

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-8 py-10 bg-gradient-to-b from-indigo-50 via-white to-white min-h-screen'>
      <header className='flex flex-col sm:flex-row justify-between items-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-indigo-700 tracking-tight'>
          설문조사 메인
        </h1>
        {loggedIn && (
          <button
            onClick={() => navigate('/forms/new')}
            className='mt-6 sm:mt-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-white rounded-xl shadow-lg transition font-medium text-base cursor-pointer'
          >
            ✏️ 새 설문 만들기
          </button>
        )}
      </header>

      {!loggedIn && (
        <section className='mb-12 bg-indigo-100 border border-indigo-200 rounded-xl p-8 text-center shadow-md'>
          <p className='mb-6 text-xl text-indigo-900 font-semibold'>
            지금 회원가입하고 나만의 설문을 만들고 응답을 받아보세요!
          </p>
          <button
            onClick={() => navigate('/signup')}
            className='inline-block px-8 py-3 bg-white border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition'
          >
            🚀 회원가입
          </button>
        </section>
      )}

      {loggedIn && (
        <FormCardList
          cardTitle='📋 내가 만든 설문'
          formList={formList}
          onMoreBtnClick={() => navigate('/forms')}
          onCardClick={(id) => navigate(`/forms/${id}`)}
          isLoggedIn={loggedIn}
        />
      )}

      <FormCardList
        cardTitle='🗳️ 설문 응시하기'
        formList={responseList}
        onMoreBtnClick={() => navigate('/responses')}
        onCardClick={handleResponseCardClick}
        isLoggedIn={loggedIn}
      />
    </main>
  );
});
export default MainPage;
