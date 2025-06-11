import { useCallback } from 'react';
import { useModal } from '@/shared/hooks/useModal';

/**
 * 폼 유효성 오류 등에 대한 알림 모달을 보여주는 커스텀 훅
 *
 * @returns {Function} showFormErrorAlert(message: string): Promise<void>
 */
export default function useFormAlert() {
  const { openModal } = useModal();

  /**
   * 폼 에러 메시지를 알림 모달로 띄움
   *
   * @param {string} message - 사용자에게 보여줄 에러 설명
   * @returns {Promise<void>} - 확인 버튼 클릭 후 resolve
   */
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
