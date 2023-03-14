import React, { FC, ReactElement, useState } from 'react';
import * as yup from 'yup';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestCreatePost } from '../features/posts/actions';
import { useAppDispatch } from '../store/hooks';

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


  return <div>Hello world!</div>;
};

export default CreatePage;
