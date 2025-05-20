import { createContext, useContext, useState } from 'react';

const FormModeContext = createContext();

export const useMode = () => useContext(FormModeContext);

export const FormModeProvider = ({ children }) => {
  const [mode, setMode] = useState('edit');
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'edit' ? 'preview' : 'edit'));
  };
  return (
    <FormModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </FormModeContext.Provider>
  );
};
