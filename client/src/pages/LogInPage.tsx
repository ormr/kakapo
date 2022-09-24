import { Grid, TextField, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

const LogInPage: FC = (): ReactElement => (
  <Grid container justifyContent="center" alignItems="center">
    <Grid xs={4} item p={4}>
      <Grid xs={12} mb={2}>
        <Typography variant="h4">Авторизация</Typography>
      </Grid>
      <Grid xs={12} mb={2}>
        <TextField label="E-mail" variant="outlined" fullWidth />
      </Grid>
      <Grid xs={12}>
        <TextField label="Password" variant="outlined" fullWidth />
      </Grid>
    </Grid>
  </Grid>
);

export default LogInPage;