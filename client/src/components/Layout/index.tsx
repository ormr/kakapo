import React, { useState, useMemo, FC, ReactNode } from 'react';
import clsx from 'clsx';
import Header from '../Header';
import 'react-circular-progressbar/dist/styles.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
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
    <div className={clsx(colorMode.mode, 'h-full')}>
      <Header />
      <main className="h-[calc(100%-5rem)]">{children}</main>
    </div>
  );
};

export default Layout;
