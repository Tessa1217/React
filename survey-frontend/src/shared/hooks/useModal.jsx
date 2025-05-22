import { useRef } from 'react';
import { useModalContext } from '@/shared/contexts/ModalContext';
export const useModal = ({
  type = 'alert',
  id,
  title,
  description,
  customModal,
}) => {
  const { addModal, removeModal } = useModalContext();
  const modalRef = useRef(() => {});

  const openModal = () => {
    return new Promise((resolve) => {
      modalRef.current = resolve;

      if (type !== 'custom') {
        addModal({
          id,
          type,
          title,
          description,
          onClose: closeModal,
          onSuccess: () => resolve(true),
        });
      }

      if (type === 'custom' && customModal) {
        addModal({
          id,
          type,
          customModal: customModal || <></>,
        });
      }
    });
  };

  const closeModal = () => {
    modalRef.current(false);
    console.log(id);
    removeModal(id);
  };

  return { openModal, closeModal };
};
