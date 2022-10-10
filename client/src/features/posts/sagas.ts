import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Axios from '../../core/axios';
import { PostsApi } from '../../services/api/PostsApi';
import { receivePosts, setPostsFailure, setPostsLoading } from './actions';
import PostActionsType from './types';
import { push } from 'redux-first-history';

function* requestPosts() {
  try {
    yield put(setPostsLoading());
    const { data } = yield call(PostsApi(Axios).getPosts);
    yield put(receivePosts(data));
  } catch (error) {
    yield put(setPostsFailure());
  }
}

interface CreatePost {
  title: string;
  content: string;
  coverImage: File;
}

function* requestCreatePost({ payload }: PayloadAction<CreatePost>) {
  try {
    yield put(setPostsLoading());

    const { coverImage, ...post } = payload;

    const { data: newPostData } = yield call(PostsApi(Axios).createPost, post);

    const formData = new FormData();
    formData.append('file', coverImage);

    yield call(PostsApi(Axios).addedImage, {
      id: newPostData.id,
      coverImage: formData,
    });

    yield call(requestPosts);
    yield put(push('/'));
  } catch (error) {
    yield put(setPostsFailure());
  }
}

function* requestGetPostById({ payload }: PayloadAction<{ id: string }>) {
  try {
    yield put(setPostsLoading());

    const { data } = yield call(PostsApi(Axios).getPost, payload.id);

    console.log(data);
  } catch (error) {
    yield put(setPostsFailure());
  }
}

export default function* postsSaga() {
  yield takeLatest(PostActionsType.REQUEST_POSTS, requestPosts);
  yield takeLatest(PostActionsType.REQUEST_GET_POST_BY_ID, requestGetPostById);
  yield takeEvery(PostActionsType.REQUEST_CREATE_POST, requestCreatePost);
}
