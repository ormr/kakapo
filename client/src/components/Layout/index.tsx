import React, { useState, useMemo, FC, ReactNode, useEffect } from 'react';
import Header from '../Header';
import PlusIcon from '../../assets/PlusIcon';
import 'react-circular-progressbar/dist/styles.css';
import AddPostForm from '../forms/AddPostForm';
import clsx from 'clsx';
import { useAuthQuery } from '../../services/api/AuthApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, data: user } = useAuthQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCredentials({ user }));
    }
  }, [isLoading, user]);

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  return (
    <div className={clsx(colorMode.mode)}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
