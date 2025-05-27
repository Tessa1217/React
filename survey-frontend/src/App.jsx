import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';
import Main from '@/widgets/Main';
import ModalContainer from '@/shared/ui/common/ModalContainer';
import { GlobalLoadingContextProvider } from '@/shared/contexts/GlobalLoadingContext.jsx';
import LoadingLayer from '@/shared/ui/common/LoadingLayer.jsx';

function App() {
  return (
    <>
      <GlobalLoadingContextProvider>
        <LoadingLayer />
        <div className='flex flex-col min-h-screen'>
          <Header />
          <Main />
          <Footer />
        </div>
      </GlobalLoadingContextProvider>
      <ModalContainer />
    </>
  );
}

export default App;
