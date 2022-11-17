import {createStore, applyMiddleware, legacy_createStore} from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Imports: Redux Root Reducer
import rootReducer from '../reducer/index';

// Imports: Redux Root Saga
import {rootSaga} from '../saga/index';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = legacy_createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    // createLogger(),
  ),
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export {store};
