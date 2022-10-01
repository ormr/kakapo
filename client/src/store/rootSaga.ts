import { all, put, takeEvery } from "redux-saga/effects";
import { postsSaga } from "../features/posts/sagas";
import { userSaga } from "../features/user/sagas";

export function* rootSaga() {
  yield all([postsSaga(), userSaga()]);
}
