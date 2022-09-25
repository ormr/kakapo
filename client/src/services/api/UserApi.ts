import { AxiosInstance } from "axios";

export interface User {
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthApi = (instance: AxiosInstance) => ({
  authMe: async (): Promise<User> => {
    const { data } = await instance.get('/authentication');
    return data;
  },
  logIn: async (form: any): Promise<User> => {
    const { data } = await instance.post('/authentication/log-in', form);
    return data;
  },
  logOut: async (form: any): Promise<User> => {
    const { data } = await instance.post('/authentication/log-out', form);
    return data;
  },
  register: async (form: any): Promise<User> => {
    const { data } = await instance.post('/authentication/register', form);
    return data;
  },
});
