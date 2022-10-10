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

export const requestCreatePost = (payload: {
  title: string;
  content: string;
  coverImage: File;
}) => ({
  type: PostActionsType.REQUEST_CREATE_POST,
  payload,
});

export const requestGetPostById = (id: string) => ({
  type: PostActionsType.REQUEST_GET_POST_BY_ID,
  payload: {
    id
  },
})
