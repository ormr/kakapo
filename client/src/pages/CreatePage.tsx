import React, { FC, ReactElement, useState } from 'react';
import * as yup from 'yup';
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import Input from '@mui/material/Input';
import rehypeSanitize from 'rehype-sanitize';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestCreatePost } from '../features/posts/actions';
import { useAppDispatch } from '../store/hooks';
import Textarea from '@uiw/react-md-editor/lib/components/TextArea/Textarea';

const CreateFormSchema = yup.object().shape({
  title: yup.string().required(),
  coverImage: yup.mixed().required(),
  content: yup.string().required(),
});

const CreatePage: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(requestCreatePost({ ...data, coverImage: data.coverImage[0] }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid spacing={4} container mt={4} mb={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Создать статью</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Превью</Typography>
            <Box>
              <Input {...register('coverImage')} type="file" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                {...register('title')}
                placeholder="Заголовок"
                style={{ width: '100%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="h6">Текст</Typography>
            </Box>
            <Box data-color-mode="light" mb={4}>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, value } }) => (
                  <MDEditor
                    value={value}
                    onChange={(newValue) => onChange(newValue)}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                )}
              />
            </Box>
            <Box>
              <Button type="submit" variant="contained">
                Отправить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default CreatePage;
