import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whilelist: [],
};

const logger = createLogger();

const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware({ thunk: false }).concat(
    sagaMiddleware
  );
  if (import.meta.env.MODE === 'development') {
    middlewares.push(logger);
  }
  return middlewares;
};

const storeReducer = combineReducers({});

const persistedReducer = persistReducer(persistConfig, storeReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export default store;
