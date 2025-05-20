import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/app/rootSaga';
import { createLogger } from 'redux-logger';

import pagingReducer from '@/shared/model/paging.slice';
import formReducer from '@/entities/form/model/form.slice';
import questionReducer from '@/entities/question/model/question.slice';
import formViewerReducer from '@/features/formViewer/model/formViewer.slice';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whilelist: [],
  blackList: ['form', 'question'],
};

const logger = createLogger();

const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }).concat(sagaMiddleware);
  if (import.meta.env.MODE === 'development') {
    middlewares.push(logger);
  }
  return middlewares;
};

const storeReducer = combineReducers({
  paging: pagingReducer,
  form: formReducer,
  question: questionReducer,
  formViewer: formViewerReducer,
});

const persistedReducer = persistReducer(persistConfig, storeReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
