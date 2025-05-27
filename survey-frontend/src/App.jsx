import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';
import Main from '@/widgets/Main';
import ModalContainer from '@/shared/ui/common/ModalContainer';
import LoadingLayer from '@/shared/ui/common/LoadingLayer.jsx';

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Main />
        <Footer />
      </div>
      {/* Loading Layer */}
      <LoadingLayer />
      {/* Modal Layer */}
      <ModalContainer />
    </>
  );
}

export default App;
