import React, { FC, ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { requestPosts } from '../features/posts/actions';

const posts = [{}]

const MainPage: FC = (): ReactElement => {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((item: any) => (
        <div>post</div>
      ))}
    </div>
  );
};

export default MainPage;
