import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/user/LoingPage';
import RegisterPage from '../../pages/user/RegisterPage';
import PostLayout from '../../pages/post/PostLayout';
import PostListPage from '../../pages/post/PostListPage';
import PostWritePage from '../../pages/post/PostWritePage';
import PostViewPage from '../../pages/post/PostViewPage';
const Main = () => {
  return (
    <main className='flex-grow container mx-auto p-6'>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/board/:boardId' element={<PostLayout />}>
          <Route index element={<PostListPage />} />
          <Route path='write' element={<PostWritePage />} />
          <Route path=':postId' element={<PostViewPage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Main;
