import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import MenuContext from './contexts/MenuContext';

function App() {
  const menus = [
    { menuId: 1, path: '/login', menuNm: '로그인', loginYn: false },
    { menuId: 2, path: '/register', menuNm: '회원가입', loginYn: false },
    { menuId: 3, path: '/board/1', menuNm: '게시판', loginYn: true },
  ];
  return (
    <MenuContext.Provider value={menus}>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
    </MenuContext.Provider>
  );
}

export default App;
