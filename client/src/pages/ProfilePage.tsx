import React, { FC, ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';

const ProfilePage: FC = (): ReactElement => {
  const userData = useAppSelector((state) => state.user.user);
  const posts = useAppSelector((state) => state.post.posts);

  console.log(userData);

  const profile = {
    name: 'Serafim',
    email: 'seraf.gavrilov@gmail.com',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Фулл стек разработчик с уклоном во фронтенд',
  };

  const { name, email, image, description } = profile;

  return (
    <Grid container>
      <Grid xs={12}>
        <Box>
          <Typography variant="h4">Профиль пользователя</Typography>
        </Box>
        <Box>
          <img src={image} alt="profile" />
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
