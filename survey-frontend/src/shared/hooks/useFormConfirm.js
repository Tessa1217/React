import { useCallback } from 'react';
import { useModal } from '@/shared/hooks/useModal';

/**
 * 폼 작업 유형 상수
 */
export const ConfirmType = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  SAVE: 'SAVE',
  DELETE: 'DELETE',
};

/**
 * Confirm 타입별 메시지 매핑
 */
const confirmMessages = {
  [ConfirmType.INSERT]: '등록하시겠습니까?',
  [ConfirmType.UPDATE]: '수정하시겠습니까?',
  [ConfirmType.SAVE]: '저장하시겠습니까?',
  [ConfirmType.DELETE]: '삭제하시겠습니까?',
};

/**
 * 폼 작업에 대한 확인(confirm) 모달을 띄우는 커스텀 훅
 *
 * @returns {(type: string) => Promise<boolean>}
 */
export default function useFormConfirm() {
  const { openModal } = useModal();

  /**
   * 확인 모달을 띄우고 사용자 응답을 반환
   *
   * @param {string} type - ConfirmType 객체의 값 중 하나
   * @returns {Promise<boolean>}
   */
  const showConfirmModal = useCallback(
    (type) => {
      const message = confirmMessages[type] || '진행하시겠습니까?';
      return openModal({
        id: 'formConfirm',
        type: 'confirm',
        title: '알림',
        description: message,
      });
    },
    [openModal]
  );

  return showConfirmModal;
}
