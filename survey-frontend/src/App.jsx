import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';
import Main from '@/widgets/Main';
import ModalContainer from '@/shared/ui/common/ModalContainer';

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
