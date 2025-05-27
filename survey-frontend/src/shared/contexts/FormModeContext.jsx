import { memo, createContext, useContext, useState } from 'react';

const FormModeContext = createContext();

export const useMode = () => useContext(FormModeContext);

export const FormModeProvider = memo(({ children, initialMode = 'edit' }) => {
  const [mode, setMode] = useState(initialMode);
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'edit' ? 'preview' : 'edit'));
  };
  return (
    <FormModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </FormModeContext.Provider>
  );
});
