import { Routes, Route } from 'react-router-dom';
import AuthGuard from '@/shared/router/AuthGuard';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import FormListPage from '@/pages/FormListPage';
import FormEditorPage from '@/pages/FormEditorPage';
import FormDetailPage from '@/pages/FormDetailPage';
import ResponseListPage from '@/pages/ResponseListPage';
import ResponseSubmitPage from '@/pages/ResponseSubmitPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route element={<AuthGuard />}>
        <Route index element={<FormEditorPage />} />
        <Route path='/forms' element={<FormListPage />} />
        <Route path='/forms/new' element={<FormEditorPage />} />
        <Route path='/forms/:id' element={<FormDetailPage />} />
        <Route path='/forms/:id/edit' element={<FormEditorPage />} />
        <Route path='/responses' element={<ResponseListPage />} />
        <Route path='/responses/:id' element={<ResponseSubmitPage />} />
      </Route>
      {/* 404 처리 */}
      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
