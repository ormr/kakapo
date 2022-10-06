import { call, put, takeLatest } from 'redux-saga/effects';
import Axios from '../../core/axios';
import { PostsApi } from '../../services/api/PostsApi';
import { receivePosts, setPostsFailure, setPostsLoading } from './actions';
import PostActionsType from './types';

function* requestPosts() {
  try {
    yield put(setPostsLoading());
    const { data } = yield call(PostsApi(Axios).getPosts);
    yield put(receivePosts(data));
  } catch (error) {
    yield put(setPostsFailure());
  }
}

export default function* postsSaga() {
  yield takeLatest(PostActionsType.REQUEST_POSTS, requestPosts);
}
