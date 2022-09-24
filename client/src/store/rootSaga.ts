import { all, put, takeEvery } from 'redux-saga/effects';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'count/increase' });
}

export function* watchIncrementAsync() {
  yield takeEvery('count/increase', incrementAsync);
}

export function* helloSaga(){
  yield console.log('Hello saga!');
}

export function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    helloSaga(),
  ]);
}