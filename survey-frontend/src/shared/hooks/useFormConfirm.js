import { useCallback } from 'react';
import { useModal } from '@/shared/hooks/useModal';

export default function useFormConfirm() {
  const { openModal } = useModal();

  const generateConfirmMsg = useCallback((type) => {
    const confirmMsgMap = {
      I: '등록하시겠습니까?',
      U: '수정하시겠습니까?',
      S: '저장하시겠습니까?',
      D: '삭제하시겠습니까?',
    };
    return confirmMsgMap[type] || '';
  }, []);

  const showConfirmModal = useCallback(
    (type) => {
      const message = generateConfirmMsg(type);
      return openModal({
        id: 'formConfirm',
        type: 'confirm',
        title: '알림',
        description: message,
      });
    },
    [openModal, generateConfirmMsg]
  );

  return showConfirmModal;
}
