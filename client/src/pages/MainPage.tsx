import React, { FC, ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { requestPosts } from '../features/posts/actions';
import Feed from '../components/Feed';

const MainPage: FC = (): ReactElement => {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]);

  return (
    <Feed posts={[1, 2, 3, 4, 5, 6, 7, 8] as any[]} />
  );
};

export default MainPage;
