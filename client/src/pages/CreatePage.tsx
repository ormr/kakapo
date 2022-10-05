import React, { FC, ReactElement, useState } from 'react';
import * as yup from 'yup';
import { Button, Container, Grid, Typography, Box, TextField } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import Input from '@mui/material/Input';
import rehypeSanitize from 'rehype-sanitize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestCreatePost } from '../features/posts/actions';
import { useAppDispatch } from '../store/hooks';
import Textarea from '@uiw/react-md-editor/lib/components/TextArea/Textarea';

const CreateFormSchema = yup.object().shape({
  title: yup.string().required(),
  preview: yup.mixed().required(),
  content: yup.string().required(),
});

const CreatePage: FC = (): ReactElement => {
  const [value, setValue] = useState<string>('');
  const handleChange = (e: string | undefined) => {
    setValue(`${e}`);
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(CreateFormSchema)
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(requestCreatePost(data))
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid spacing={4} container mt={4} mb={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Создать статью</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Превью</Typography>
            <Box>
              <Input {...register('preview')} name="preview" type="file" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">Заголовок</Typography>
              <TextField />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={4}>
              <Typography variant="h6">Текст</Typography>
              <MDEditor
                value={value}
                onChange={(newValue) => handleChange(newValue)}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Box>
            <Box>
              <Button variant="contained">Отправить</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default CreatePage;
