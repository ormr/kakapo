import React, { FC, ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

const SignInSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  password2: yup.string().required(),
});

const SignInPage: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = () => {};

  return <div></div>;
};

const Input = () => {
  return <input />;
};

export default SignInPage;
