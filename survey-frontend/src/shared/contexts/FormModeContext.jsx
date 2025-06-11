import { memo, createContext, useContext, useState } from 'react';

const FormModeContext = createContext();

/**
 * 커스텀 훅: FormModeContext에 접근해 mode와 toggleMode를 제공
 *
 * @returns {{ mode: string, toggleMode: Function }}
 */
export const useMode = () => useContext(FormModeContext);

/**
 * 모드 상태를 전역적으로 제공하는 Provider 컴포넌트
 *
 * @param {ReactNode} children - 하위 컴포넌트들
 * @param {string} initialMode - 초기 모드 ('edit' 또는 'preview'), 기본값은 'edit'
 */
export const FormModeProvider = memo(({ children, initialMode = 'edit' }) => {
  const [mode, setMode] = useState(initialMode);

  /**
   * 모드 토글 핸들러
   * - 현재 모드가 'edit'이면 'preview'로, 그 반대도 동일
   */
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'edit' ? 'preview' : 'edit'));
  };
  return (
    <FormModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </FormModeContext.Provider>
  );
});
