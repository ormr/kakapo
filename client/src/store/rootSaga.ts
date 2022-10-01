import { all } from 'redux-saga/effects';
import postsSaga from '../features/posts/sagas';
import userSaga from '../features/user/sagas';

export default function* rootSaga() {
  yield all([postsSaga(), userSaga()]);
}
