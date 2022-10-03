import { Post } from '../../services/api/PostsApi';
import PostActionsType from './types';

export const receivePosts = (payload: Post) => ({
  type: PostActionsType.RECEIVE_POSTS,
  payload,
});

export const requestPosts = () => ({
  type: PostActionsType.REQUEST_POSTS,
});

export const setPostsFailure = () => ({
  type: PostActionsType.SET_FAILURE,
});

export const setPostsLoading = () => ({
  type: PostActionsType.SET_LOADING,
});
