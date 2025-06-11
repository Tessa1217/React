import { useRef, useCallback } from 'react';
import { useModalContext } from '@/shared/contexts/ModalContext';

/**
 * 공통 모달 열기 전용 커스텀 훅
 *
 * Promise 기반으로 사용자 응답을 받아 처리할 수 있음
 * - alert: 확인 버튼만 있는 알림
 * - confirm: 확인/취소 버튼 있는 모달
 * - custom: 커스텀 컴포넌트를 담은 모달
 *
 * @returns {{
 *   openModal: (config: {
 *     id: string,
 *     type: 'alert' | 'confirm' | 'custom',
 *     title?: string,
 *     description?: string,
 *     customModal?: React.ReactNode,
 *   }) => Promise<boolean>
 * }}
 */
export const useModal = () => {
  const { addModal, removeModal } = useModalContext();
  const modalRef = useRef(() => {});

  /**
   * 모달 열기 함수 (Promise 기반)
   *
   * @param {{
   *   id: string,
   *   type: 'alert' | 'confirm' | 'custom',
   *   title?: string,
   *   description?: string,
   *   customModal?: React.ReactNode
   * }} config
   * @returns {Promise<boolean>} - 사용자가 확인(true) 또는 취소(false)를 선택한 결과
   */
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
