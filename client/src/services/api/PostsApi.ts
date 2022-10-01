import { AxiosInstance, AxiosResponse } from "axios";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const PostsApi = (instance: AxiosInstance) => ({
  getPosts: async (): Promise<AxiosResponse<Post>> => instance.get("/posts"),
  getPost: async (id: string): Promise<Post> => {
    const { data } = await instance.get(`/posts/${id}`);
    return data;
  },
  createPost: async (form: Post): Promise<Post> => {
    const { data } = await instance.post("/posts", form);
    return data;
  },
  deletePost: async (id: string): Promise<void> =>
    instance.delete(`/rooms/${id}`),
});
