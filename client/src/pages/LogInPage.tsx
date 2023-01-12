import React, { FC, ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { requestLogIn } from '../features/user/actions';

const LoginFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required(),
});

const LogInPage: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(requestLogIn(data));
  };

  return (
    <div>Log in page </div>
  );
};

export default LogInPage;
