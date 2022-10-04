import { AxiosInstance, AxiosResponse } from 'axios';

export interface User {
  id: string;
  email: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  avatarId: string;
}

export const AuthApi = (instance: AxiosInstance) => ({
  auth: async (): Promise<AxiosResponse<User>> =>
    instance.get('/authentication'),
  register: async (form: {
    name: string;
    email: string;
    password: string;
  }): Promise<AxiosResponse<User>> =>
    instance.post('/authentication/register', form, {
      withCredentials: true,
    }),
  logIn: async (form: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<User>> =>
    instance.post('/authentication/log-in', form, {
      withCredentials: true,
    }),
  logOut: async (): Promise<AxiosResponse<User>> =>
    instance.post('/authentication/log-out', {
      withCredentials: true,
    }),
});
