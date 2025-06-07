import { useCallback } from 'react';
import { useModal } from '@/shared/hooks/useModal';

export default function useFormAlert() {
  const { openModal } = useModal();
  const showFormErrorAlert = useCallback(
    (message) => {
      return openModal({
        id: 'formErrorAlert',
        type: 'alert',
        title: '알림',
        description: message,
      });
    },
    [openModal]
  );

  return showFormErrorAlert;
}
