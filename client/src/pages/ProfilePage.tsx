import React, { FC, ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { BASE_URL } from '../core/axios';

const ProfilePage: FC = (): ReactElement => {
  const userData = useAppSelector((state) => state.user.data);
  const posts = useAppSelector((state) => state.post.posts);

  const { name, email, description, avatarId } = userData || {};

  return (
    <Grid container>
      <Grid xs={12}>
        <Box>
          <Typography variant="h4">Профиль пользователя</Typography>
        </Box>
        <Box>
          <img
            src={`${BASE_URL}/local-files/${avatarId}`}
            alt="profile"
            style={{ maxWidth: '200px' }}
          />
        </Box>
        <Box>
          <Typography>
            <Box>{name}</Box>
            <Box>{description}</Box>
            <Box>{email}</Box>
          </Typography>
        </Box>
        <Box>
          <Box>Посты пользователя</Box>
          <Box>
            {posts.map((item) => (
              <Box>{item.title}</Box>
            ))}
          </Box>
        </Box>
        <Box />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
