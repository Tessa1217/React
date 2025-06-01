import { useRef, useCallback } from 'react';
import { useModalContext } from '@/shared/contexts/ModalContext';
export const useModal = () => {
  const { addModal, removeModal } = useModalContext();
  const modalRef = useRef(() => {});

  const openModal = useCallback(
    ({ type = 'alert', id, title, description, customModal }) => {
      return new Promise((resolve) => {
        modalRef.current = resolve;

        if (type !== 'custom') {
          addModal({
            id,
            type,
            title,
            description,
            onClose: () => {
              resolve(false);
              removeModal(id);
            },
            onSuccess: () => {
              resolve(true);
              removeModal(id);
            },
          });
        }

        if (type === 'custom' && customModal) {
          addModal({
            id,
            type,
            customModal: customModal || <></>,
            onClose: () => {
              resolve(false);
              removeModal(id);
            },
          });
        }
      });
    },
    [addModal, removeModal]
  );

  return { openModal };
};
