import React, { FC, ReactElement, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Post } from "../components/Post";
import { getPosts } from "../features/posts/postSlice";
import { fetchUser } from "../features/user/userSlice";

const MainPage: FC = (): ReactElement => {
  const { loading, posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
