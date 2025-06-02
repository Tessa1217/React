import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './app/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from '@/shared/contexts/ModalContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
