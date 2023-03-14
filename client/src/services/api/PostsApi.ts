import { AxiosInstance, AxiosResponse } from 'axios';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CreatePost {
  title: string;
  content: string;
}

export const PostsApi = (instance: AxiosInstance) => ({
  getPosts: async (): Promise<AxiosResponse<Post>> => instance.get('/posts'),
  getPost: async (id: string): Promise<Post> =>
    await instance.get(`/posts/${id}`),
  createPost: async (form: CreatePost): Promise<Post> =>
    await instance.post('/posts', form),
  deletePost: async (id: string): Promise<void> =>
    instance.delete(`/rooms/${id}`),
  addedImage: async ({ id, coverImage }: any): Promise<any> =>
    instance.post(`/posts/${id}`, coverImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
});
