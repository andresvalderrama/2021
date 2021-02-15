import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware({
      thunk: false,
    }),
  ],
});

sagaMiddleware.run(rootSagas);

export default store;
