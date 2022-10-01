import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { Axios } from '../../core/axios'
import { PostsApi } from '../../services/api/PostsApi'
import { Post, setPosts, setPostsError } from './postSlice'

function* fetchPostsRequest() {
  try {
    const { data } = yield call(PostsApi(Axios).getPosts)

    yield put(setPosts(data))
  } catch (error) {
    yield put(setPostsError())
  }
}

export function* postsSaga() {
  yield takeEvery('posts/getPosts', fetchPostsRequest)
}
