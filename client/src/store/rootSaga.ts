import { all, put, takeEvery } from 'redux-saga/effects';
import { postsSaga } from '@src/features/posts/sagas';

export function* rootSaga() {
  yield all([postsSaga()]);
}