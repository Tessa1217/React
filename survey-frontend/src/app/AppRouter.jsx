import { Routes, Route } from 'react-router-dom';
import AuthGuard from '@/shared/router/AuthGuard';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import FormListPage from '@/pages/FormListPage';
import FormEditorPage from '@/pages/FormEditorPage';
import FormDetailPage from '@/pages/FormDetailPage';
import ResponseListPage from '@/pages/ResponseListPage';
import ResponseSubmitPage from '@/pages/ResponseSubmitPage';
import ResponseDetailPage from '@/pages/ResponseDetailPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route index element={<MainPage />} />
      <Route element={<AuthGuard />}>
        <Route path='/forms' element={<FormListPage />} />
        <Route path='/forms/new' element={<FormEditorPage />} />
        <Route path='/forms/:id' element={<FormDetailPage />} />
        <Route path='/forms/:id/edit' element={<FormEditorPage />} />
        <Route path='/responses' element={<ResponseListPage />} />
        <Route path='/responses/:id' element={<ResponseDetailPage />} />
        <Route path='/responses/take/:id' element={<ResponseSubmitPage />} />
      </Route>
      {/* 404 처리 */}
      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
