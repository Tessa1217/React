import { Routes, Route } from 'react-router-dom';
// import LoginPage from '@/pages/LoginPage';
// import SignupPage from '@/pages/SignupPage';
import FormListPage from '@/pages/FormListPage';
import FormEditorPage from '@/pages/FormEditorPage';
import FormDetailPage from '@/pages/FormDetailPage';
// import ResponseListPage from '@/pages/ResponseListPage';
// import ResponseSubmitPage from '@/pages/ResponseSubmitPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<FormEditorPage />} />
      {/* <Route path='/login' element={<LoginPage />} />
    <Route path='/signup' element={<SignupPage />} /> */}
      <Route path='/forms' element={<FormListPage />} />
      <Route path='/forms/new' element={<FormEditorPage />} />
      <Route path='/forms/:id' element={<FormDetailPage />} />
      {/* <Route path='/forms/:id/edit' element={<FormEditorPage />} />
    <Route path='/responses' element={<ResponseListPage />} />
    <Route path='/responses/:formId' element={<ResponseSubmitPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
