import React, { FC, ReactElement, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Post from '../components/Post';
import { requestPosts } from '../features/posts/actions';

const MainPage: FC = (): ReactElement => {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]);

  return (
    <Container>
      <Grid container mt={7} direction="column" alignItems="center">
        {posts.map((item) => (
          <Grid item xs={12} mb={3}>
            <Post {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage;
