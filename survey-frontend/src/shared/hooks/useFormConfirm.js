import { useCallback } from 'react';
import { useModal } from '@/shared/hooks/useModal';

export default function useFormConfirm() {
  const { openModal } = useModal();

  const generateConfirmMsg = useCallback((type) => {
    switch (type) {
      case 'I':
        return '등록하시겠습니까?';
      case 'U':
        return '수정하시겠습니까?';
      case 'S':
        return '저장하시겠습니까?';
      case 'D':
        return '삭제하시겠습니까?';
      default:
        throw new Error('정해지지 않은 컨펌 타입니다.');
    }
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
