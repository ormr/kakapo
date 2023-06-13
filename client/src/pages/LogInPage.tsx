import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../services/api/AuthApi';
import { useAppDispatch } from '../store/hooks';

const LogInPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (formState: any) => {
    const user = await login(formState).unwrap();
    dispatch(setCredentials(user));
    navigate('/profile');
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

export default LogInPage;
