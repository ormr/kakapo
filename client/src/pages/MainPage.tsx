import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { Post } from '@src/components/Post';
import { addPost, stockImages } from '@src/features/posts/postSlice';

const MainPage: FC = (): ReactElement => {
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addPost({
      id: '1',
      title: 'My essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
      image: stockImages[Math.floor(Math.random() * 5)],
      author: 'Serafim Gavrilov',
    }))
  };  

  return (
    <Container>
      <button onClick={handleAdd}>+</button>
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
}

export default MainPage;