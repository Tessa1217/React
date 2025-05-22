import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const addModal = (newModal) => {
    setModals((prevModals) => [...prevModals, newModal]);
  };
  const removeModal = (closeId) => {
    setModals((prevModals) => prevModals.filter(({ id }) => id !== closeId));
  };

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
