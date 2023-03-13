import React, { FC } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../Input';
import Button from '../../Button';

const LoginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const defaultValues = {
  email: '',
  password: '',
}

const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = () => {

  };

  return (
    <form>
      <label>
        Email: 
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input value={value} onChange={onChange} />
          )}
        />
      </label>
      <label>
        Password: 
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input value={value} onChange={onChange} />
          )}
        />
      </label>
      <Button>Log In</Button>
    </form>
  );
};

export default LoginForm;
