import React, { FC, ReactElement, useState } from 'react';
import * as yup from 'yup';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestCreatePost } from '../features/posts/actions';
import { useAppDispatch } from '../store/hooks';

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


  return <div>Hello world!</div>;
};

export default CreatePage;
