import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { RootState } from '@src/app/store';
import { Post as IPost, addPost } from '@src/slices/postSlice';
import React, { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../Post';

const author = 'Serafim Gavrilov <seraf.gavrilov@gmail.com>';

export const Feed: FC = (): ReactElement => {
  const { posts } = useSelector((state: RootState) => state.post);

  // Широкий компонент отображается только если он является последним

  return (
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
  );
};
