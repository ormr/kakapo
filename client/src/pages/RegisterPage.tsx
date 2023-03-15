import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';
import { useRegisterMutation } from '../services/api/AuthApi';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const handleSubmit = async (formState: any) => {
    await register(formState);
    navigate('/login');
  };

  return <RegisterForm onSubmit={handleSubmit} />;
};

export default RegisterPage;
