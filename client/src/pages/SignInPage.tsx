import React, { FC, ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const SignInSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  password2: yup.string().required(),
});

const SignInPage: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = () => {};

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={4} item p={4}>
        <Grid xs={12} mb={2}>
          <Typography variant="h4">Регистрация</Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} mb={2}>
            <TextField
              {...register('name')}
              error={!!errors?.name}
              helperText={errors?.name?.message as ReactNode}
              label="Имя"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField
              {...register('email')}
              error={!!errors?.email}
              helperText={errors?.email?.message as ReactNode}
              label="E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField
              {...register('password')}
              error={!!errors?.password}
              helperText={errors?.password?.message as ReactNode}
              label="Пароль"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={12} mb={2}>
            <TextField
              {...register('password2')}
              error={!!errors?.password2}
              helperText={errors?.password2?.message as ReactNode}
              label="Повторите пароль"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Подтвердить
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
