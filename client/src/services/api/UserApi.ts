import { AxiosInstance, AxiosResponse } from "axios";

export interface User {
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthApi = (instance: AxiosInstance) => ({
  auth: async (): Promise<AxiosResponse<User>> => {
    return await instance.get('/authentication');
  },
  register: async (form: { name: string, email: string, password: string }): Promise<AxiosResponse<User>> => {
    return await instance.post('/authentication/register', form, { withCredentials: true });
  },
  logIn: async (form: { email: string, password: string }): Promise<AxiosResponse<User>> => {
    return await instance.post('/authentication/log-in', form, { withCredentials: true });
  },
  logOut: async (): Promise<AxiosResponse<User>> => {
    return await instance.post('/authentication/log-out');
  },
});
