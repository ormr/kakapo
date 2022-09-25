import { call, put, takeEvery } from "redux-saga/effects";
import { PostsApi } from "@src/services/api/PostsApi";
import { Axios } from "@src/core/axios";
import { Post, setPosts } from "./postSlice";
import { AxiosResponse } from "axios";

function* fetchPostsRequest() {
  // try {
  const data: AxiosResponse<Post[]> = yield call(PostsApi(Axios).getPosts);

  console.log(data);
    
  // yield put(setPosts(data));
  // } catch (error) {
  //   yield put()
  // }
}

export function* postsSaga() {
  yield takeEvery('posts/getPosts', fetchPostsRequest);
}