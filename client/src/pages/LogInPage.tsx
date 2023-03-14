import React, { FC, ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { requestLogIn } from '../features/user/actions';
import LoginForm from '../components/forms/LoginForm';
import Container from '../components/Container';

const LoginFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required(),
});

const LogInPage: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const handleSubmit = (data: any) => {
    dispatch(requestLogIn(data));
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

export default LogInPage;
