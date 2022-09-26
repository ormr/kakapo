import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from "redux-saga/effects";
import { PostsApi } from "@src/services/api/PostsApi";
import { Axios } from "@src/core/axios";
import { Post, setPosts, setPostsError } from "./postSlice";

function* fetchPostsRequest() {
  try {
    const { data } = yield call(PostsApi(Axios).getPosts);

    yield put(setPosts(data));
  } catch (error) {
    yield put(setPostsError())
  }
}

export function* postsSaga() {
  yield takeEvery('posts/getPosts', fetchPostsRequest);
}
