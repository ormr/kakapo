import React, { FC, ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import RegisterForm from '../components/forms/RegisterForm';
import { useRegisterMutation } from '../features/user/api';

const RegisterPage: FC = (): ReactElement => {
  const [register, { isLoading }] = useRegisterMutation(); 

  return <RegisterForm onSubmit={(data) => register(data)} />;
};

export default RegisterPage;
