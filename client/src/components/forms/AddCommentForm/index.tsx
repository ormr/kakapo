import React, { FC } from 'react';
import Button from '../../Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface AddCommentProps {
  onAddComment: (data: { content: string }) => void;
}

const AddCommentSchema = yup.object().shape({
  content: yup.string().required(),
});

const defaultValues = {
  content: '',
};

const AddCommentForm: FC<AddCommentProps> = ({ onAddComment }) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(AddCommentSchema),
  });

  return (
    <div className="w-full flex">
      <input
        {...register('content')}
        type="text"
        className="flex-none py-2.5 px-2 w-full shadow-none block border-1 border-neutral-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Добавить комментарий"
      />
      <Button onClick={handleSubmit(onAddComment)}>Post</Button>
    </div>
  );
};

export default AddCommentForm;
