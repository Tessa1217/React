import { useModalContext } from '@/shared/contexts/ModalContext';
import ModalDialog from '@/shared/ui/common/ModalDialog';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';
const ModalContainer = () => {
  const { modals, removeModal } = useModalContext();
  const handleDimmerClick = useCallback(
    (e, id) => removeModal(id),
    [removeModal]
  );
  return (
    <>
      {modals.map((modal, idx) => {
        return createPortal(
          <ModalDialog
            key={`${modal.id}_${idx + 1}`}
            modal={modal}
            onDimmerClick={handleDimmerClick}
          />,
          document.body
        );
      })}
    </>
  );
};

export default ModalContainer;
