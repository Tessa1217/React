import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './app/store.js';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from '@/shared/contexts/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const persistor = persistStore(store);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <App />
        {/* <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate> */}
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);
