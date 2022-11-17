import {takeLatest, put, call} from 'redux-saga/effects';
import * as Actions from '../actions/action';
import serverCall from '../server/server';

function* saveToken(action) {
  try {
    yield put({type: Actions.GLOBAL_TOKEN, payload: action.payload});
  } catch (error) {
    console.log(error);
  }
}

function* getSubredditData(action) {
  try {
    const data = yield call(serverCall, action.payload);
    if (data) {
      yield put({type: Actions.SUBREDDIT_DATA, payload: data});
    } else {
      console.log('fail');
    }
  } catch (error) {
    console.log(error);
  }
}

export function* setToken() {
  yield takeLatest(Actions.SET_TOKEN, saveToken);
}
export function* getPostData() {
  yield takeLatest(Actions.REDDIT_DATA, getSubredditData);
}
