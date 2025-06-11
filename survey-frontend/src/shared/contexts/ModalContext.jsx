import { createContext, useContext, useState, memo, useCallback } from 'react';

const ModalContext = createContext(null);

/**
 * 모달 컨텍스트를 사용하는 커스텀 훅
 * - 반드시 ModalProvider 하위에서 사용해야 함
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

/**
 * 모달 전역 상태를 제공하는 컨텍스트 Provider
 * - 등록된 모달 리스트를 관리하고 추가/제거 기능 제공
 */
export const ModalProvider = memo(({ children }) => {
  const [modals, setModals] = useState([]);

  /**
   * 모달 추가
   *
   * @param {Object} newModal - { id: string, component: ReactNode, ... }
   */
  const addModal = useCallback((newModal) => {
    setModals((prevModals) => [...prevModals, newModal]);
  }, []);

  /**
   * 특정 ID의 모달 제거
   *
   * @param {string} closeId - 제거할 모달의 ID
   */
  const removeModal = useCallback((closeId) => {
    setModals((prevModals) => prevModals.filter(({ id }) => id !== closeId));
  }, []);

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );
});
