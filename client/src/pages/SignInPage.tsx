import React, { FC, ReactElement } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const SignInPage: FC = (): ReactElement => {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={4} item p={4}>
          <Grid xs={12} mb={2}>
            <Typography variant="h4">Регистрация</Typography>
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField label="Имя" variant="outlined" fullWidth />
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField label="E-mail" variant="outlined" fullWidth />
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField label="Пароль" variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SignInPage;
