import {all, fork} from 'redux-saga/effects';
import {getPostData, setToken} from './stateSaga';

export function* rootSaga() {
  yield all([fork(setToken), fork(getPostData)]);
}
