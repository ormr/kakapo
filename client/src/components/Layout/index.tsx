import React, { useState, useEffect, useMemo, FC, ReactNode } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { requestUserData } from '../../features/user/actions';
import Header from '../Header';
import PlusIcon from '../../assets/PlusIcon';
import 'react-circular-progressbar/dist/styles.css';
import AddPostForm from '../AddPostForm';
import clsx from 'clsx';

interface LayoutProps {
  children: ReactNode;
}

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
    <div className={clsx(colorMode.mode)}>
      <Header />
      <main>{children}</main>
      <TogglePostForm />
    </div>
  );
};

const TogglePostForm = () => {
  const [showPost, setShowPost] = useState(false);
  return (
    <div>
      <div className="fixed bottom-3 right-3">
        <button
          className="rounded-full bg-neutral-800 text-white p-3"
          onClick={() => setShowPost(true)}
        >
          <PlusIcon />
        </button>
      </div>
      {showPost && <AddPostForm onFormClose={() => setShowPost(false)} />}
    </div>
  );
};

export default Layout;
