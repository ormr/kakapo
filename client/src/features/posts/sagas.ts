import { call, put, takeEvery } from 'redux-saga/effects';
import Axios from '../../core/axios';
import { PostsApi } from '../../services/api/PostsApi';
import { setPosts, setPostsError } from './postSlice';

function* fetchPostsRequest() {
  try {
    const { data } = yield call(PostsApi(Axios).getPosts);

    yield put(setPosts(data));
  } catch (error) {
    yield put(setPostsError());
  }
}

export default function* postsSaga() {
  yield takeEvery('posts/getPosts', fetchPostsRequest);
}
