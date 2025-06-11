import { Routes, Route } from 'react-router-dom';
import AuthGuard from '@/shared/router/AuthGuard';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/user/LoginPage';
import SignupPage from '@/pages/user/SignupPage';
import FormPage from '@/pages/form/FormPage';
import FormListPage from '@/pages/form/FormListPage';
import FormEditorPage from '@/pages/form/FormEditorPage';
import FormDetailPage from '@/pages/form/FormDetailPage';
import ResponsePage from '@/pages/response/ResponsePage';
import ResponseListPage from '@/pages/response/ResponseListPage';
import ResponseSubmitPage from '@/pages/response/ResponseSubmitPage';
import ResponseDetailPage from '@/pages/response/ResponseDetailPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import ServerErrorPage from '@/pages/error/ServerErrorPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route index element={<MainPage />} />
      <Route path='/responses' element={<ResponsePage />}>
        <Route index element={<ResponseListPage />} />
        <Route path='/responses/:id' element={<ResponseDetailPage />} />
        <Route path='/responses/take/:id' element={<ResponseSubmitPage />} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route path='/forms' element={<FormPage />}>
          <Route index element={<FormListPage />} />
          <Route path='/forms/new' element={<FormEditorPage />} />
          <Route path='/forms/:id' element={<FormDetailPage />} />
          <Route path='/forms/:id/edit' element={<FormEditorPage />} />
        </Route>
      </Route>
      {/* 500 처리 */}
      <Route path='/error' element={<ServerErrorPage />} />
      {/* 404 처리 */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
