import React, { useState, useEffect, useMemo, ReactElement, FC, ReactNode } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { requestUserData } from '../../features/user/actions';
import Header from '../Header';
import PlusIcon from '../../assets/PlusIcon';
import ImageIcon from '../../assets/ImageIcon';
import VideoIcon from '../../assets/VideoIcon';
import PaperclipIcon from '../../assets/Paperclip';

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
    <div className="relative">
      <Header />
      <main>{children}</main>
      <CreatePost />
      {/* <AddPostButton onClick={() => console.log('!')}/> */}
    </div>
  );
};

const CreatePost = () => (
  <div className="absolute top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
    <div className="w-full h-72 fixed bottom-0 bg-white py-6 px-3">
      <h3 className="mb-3 font-bold">Create post</h3>
      <textarea
        className="h-30 py-2.5 px-2 w-full shadow-none block border-2 border-neutral-300 focus:ring-blue-500 focus:border-blue-500 rounded-sm resize-none"
        placeholder="Start typing here..."
      />
      <div className="w-full flex items-center gap-3.5 mt-2 mb-4">
        <p className="text-xs text-gray-400">Add:</p>
        <button><ImageIcon /></button>
        <button><VideoIcon /></button>
        <button><PaperclipIcon /></button>
        <div className="flex-1 flex justify-end">div</div>
      </div>
      <button className="w-full p-4 bg-black text-white border-1">Post</button>
    </div>
  </div>
);

interface AddPostButton {
  onClick: VoidFunction;
}

const AddPostButton: FC<AddPostButton> = ({ onClick }) => (
  <div className="fixed bottom-3 right-3">
    <button
      className="rounded-full bg-neutral-800 text-white p-3"
      onClick={onClick}>
      <PlusIcon />
    </button>
  </div>
);

export default Layout;
