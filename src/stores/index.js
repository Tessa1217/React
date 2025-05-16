import { persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import todoReducer from './todos';
import loadingReducer from './loading';
import authReducer from './auth';
import { createLogger } from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const logger = createLogger();

const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware();
  if (import.meta.env.MODE === 'development') {
    middlewares.push(logger);
  }
  return middlewares;
};

const storeReducer = combineReducers({
  todos: todoReducer,
  loading: loadingReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, storeReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export default store;
