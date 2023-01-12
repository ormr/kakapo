import React, { useState, useEffect, useMemo, ReactElement, FC, ReactNode } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { requestUserData } from '../../features/user/actions';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestUserData());
  }, []);

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
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
