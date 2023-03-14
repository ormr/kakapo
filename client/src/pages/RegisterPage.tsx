import React, { FC, ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage: FC = (): ReactElement => {
  return <RegisterForm onSubmit={(data) => console.log(data)} />;
};

export default RegisterPage;
