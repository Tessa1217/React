import { createContext, useState, useCallback } from 'react';

export const GlobalLoadingContext = createContext(null);

export const GlobalLoadingContextProvider = ({
  children,
  initialLoadingState = false,
}) => {
  const [loading, setLoading] = useState(initialLoadingState);
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  return (
    <GlobalLoadingContext.Provider
      value={{ loading, startLoading, stopLoading }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  );
};
