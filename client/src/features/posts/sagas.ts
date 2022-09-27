import { call, put, takeEvery } from "redux-saga/effects";
import { PostsApi } from "@src/services/api/PostsApi";
import { Axios } from "@src/core/axios";
import { Post, setPosts } from "./postSlice";
import { AxiosResponse } from "axios";

function* fetchPostsRequest() {
  const data: AxiosResponse<Post[]> = yield call(PostsApi(Axios).getPosts);

  // temp solution
  yield put(setPosts(data as unknown as Post[]));
}

export function* postsSaga() {
  yield takeEvery('posts/getPosts', fetchPostsRequest);
}