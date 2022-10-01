import { Grid, TextField, Typography, Button } from '@mui/material';
import React, { FC, ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

const LoginFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required(),
});

const LogInPage: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: any) => {
    dispatch({ type: 'user/requestUserLogIn', payload: data });
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={4} p={4}>
        <Grid xs={12} mb={2}>
          <Typography variant="h4">Авторизация</Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} mb={2}>
            <TextField
              {...register('email')}
              error={!!errors?.email}
              helperText={errors?.email?.message as ReactNode}
              label="E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <TextField
              {...register('password')}
              error={!!errors?.password}
              helperText={errors?.password?.message as ReactNode}
              type="password"
              label="Password"
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

export default LogInPage;
