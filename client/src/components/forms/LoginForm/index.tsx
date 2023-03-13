import React, { ChangeEvent, FC } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const SignInSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  password2: yup.string().required(),
});

interface InputProps {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = () => {};

  return (
    <div>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChange={onChange} />
        )}
      />
    </div>
  );
};

export default LoginForm;
