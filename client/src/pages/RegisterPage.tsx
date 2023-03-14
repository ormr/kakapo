import React, { FC, ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import RegisterForm from '../components/forms/RegisterForm';
import { requestRegister } from '../features/user/actions';
import { useAppDispatch } from '../store/hooks';

const RegisterPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: any) => {
    dispatch(requestRegister(data));
  };

  return <RegisterForm onSubmit={handleSubmit} />;
};

export default RegisterPage;
