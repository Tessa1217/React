import { useModalContext } from '@/shared/contexts/ModalContext';
import ModalDialog from '@/shared/ui/common/ModalDialog';
import { createPortal } from 'react-dom';
const ModalContainer = () => {
  const { modals } = useModalContext();
  return (
    <>
      {modals.map((modal, idx) => {
        return createPortal(
          <ModalDialog key={`${modal.id}_${idx + 1}`} modal={modal} />,
          document.body
        );
      })}
    </>
  );
};

export default ModalContainer;
