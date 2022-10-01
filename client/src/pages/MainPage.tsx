import React, { FC, ReactElement, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Post from '../components/Post';
import { getPosts } from '../features/posts/postSlice';
// import { fetchUser } from '../features/user/userSlice';

const MainPage: FC = (): ReactElement => {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Container>
      <Grid container mt={7} direction="column" alignItems="center">
        {posts.map((item) => (
          <Grid item xs={12} mb={3}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Post {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage;
