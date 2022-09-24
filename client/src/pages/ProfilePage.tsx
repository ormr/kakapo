import React, { FC, ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';

const ProfilePage: FC = (): ReactElement => {

  const profile = {
    name: 'Serafim',
    email: 'seraf.gavrilov@gmail.com',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Фулл стек разработчик с уклоном во фронтенд',
  }

  const userPosts = [
    {
      id: '1',
      title: 'My essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
    },
    {
      id: '2',
      title: 'Another essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
    },
    {
      id: '3',
      title: 'My best essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
    },
    {
      id: '3',
      title: 'The final essay in english',
      description: "That's how I started this post",
      createdAt: new Date().toDateString(),
    },
  ]

  const { name, email, image, description } = profile;

  return (
    <Grid container>
      <Grid xs={12}>
        <Box>
          <Typography variant="h4">Профиль пользователя</Typography>
        </Box>
        <Box>
          <img src={image} />
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
          <Box>{userPosts.map((item) => <Box>{item.title}</Box>)}</Box>
        </Box>
        <Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage