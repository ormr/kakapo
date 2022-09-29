import React, { FC, ReactElement, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { Post } from '@src/components/Post';
import { getPosts } from '@src/features/posts/postSlice';

const MainPage: FC = (): ReactElement => {
  const { loading, posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, []);

  console.log(loading);

  return (
    <>
      <Container>
        <Grid
          container
          mt={7}
          direction="column"
          alignItems="center"
        >
          {posts.map((item) => (
            <Grid item xs={12} mb={3}>
              <Post {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MainPage;
