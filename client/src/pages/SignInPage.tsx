import React, { FC, ReactElement } from 'react'
import * as yup from 'yup'
import { Grid, TextField, Typography, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const SignInSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  password2: yup.string().required(),
})

const SignInPage: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid xs={4} item p={4}>
          <Grid xs={12} mb={2}>
            <Typography variant='h4'>Регистрация</Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid xs={12} mb={2}>
              <TextField
                {...register('name')}
                label='Имя'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid xs={12} mb={2}>
              <TextField
                {...register('email')}
                label='E-mail'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid xs={12} mb={2}>
              <TextField
                {...register('password')}
                label='Пароль'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid xs={12} mb={2}>
              <TextField
                {...register('password2')}
                label='Повторите пароль'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                Подтвердить
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default SignInPage
