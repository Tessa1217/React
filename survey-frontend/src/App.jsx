import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';
import Main from '@/widgets/Main';
import ModalContainer from '@/shared/ui/common/ModalContainer';
import { useModal } from '@/shared/hooks/useModal';

function App() {
  const { openModal, closeModal } = useModal({
    type: 'alert',
    id: 'testModal',
    description: <div>첫번째 모달</div>,
  });

  // const { openModal: openModal2 } = useModal({
  //   type: 'confirm',
  //   id: 'testModal2',
  //   description: <div>두번째 모달 모달 헤헤헤ㅔ</div>,
  // });

  const modalTest = () => {
    openModal();
    // openModal2();
  };
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <button
          className='p-2 text-blue-600 bg-white hover:text-blue-800 disabled:opacity-40 cursor-pointer'
          onClick={() => modalTest()}
        >
          모달 오픈 버튼
        </button>
        <Main />
        <Footer />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
