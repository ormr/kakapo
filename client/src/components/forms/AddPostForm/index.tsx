import React, { FC, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ImageIcon from '../../../assets/ImageIcon';
import PaperclipIcon from '../../../assets/Paperclip';
import VideoIcon from '../../../assets/VideoIcon';
import useOnClickOutside from '../../../hooks/useOutsideClick';
import Button from '../../Button';
import TextArea from '../../Textarea';
import Progressbar from './ProgressBar';
import FileLoader from '../../FileLoader';
import { AttachmentType } from '../../FileLoader/utils';
import FileLoaderButton from '../../FileLoader/FileLoaderButton';
import { useAddFileToPostMutation, useCreatePostMutation } from '../../../services/api/PostsApi';

interface AddPostFormProps {
  onFormClose: VoidFunction;
}

export interface AddPostFormValues {
  content: string;
  files: File[];
}

const defaultValues = {
  content: '',
  files: [],
};

/*
 * TODO:
 * Прикрутить сохранение нескольких изображений на сервере
 * */

const AddPostForm: FC<AddPostFormProps> = ({ onFormClose }) => {
  const maxValue = 250;
  const formRef = useRef() as any;
  const { control, watch, handleSubmit } = useForm({
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [addFileToPost] = useAddFileToPostMutation();

  const onSubmit = async ({ content, files }: AddPostFormValues) => {
    setIsLoading(true);
    const post = await createPost({ content });

    if ('data' in post && files) {
      files.forEach(async (file) => {
        await addFileToPost({ postId: post.data.id, file });
      });
    }

    setIsLoading(false);
    onFormClose();
  };

  useOnClickOutside(formRef, () => onFormClose());

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
      <div ref={formRef} className="w-full h-72 fixed bottom-0 bg-white py-6 px-3">
        <h3 className="mb-3 font-bold">Create post</h3>
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => <TextArea value={value} onChange={onChange} />}
        />
        <div className="w-full flex items-center gap-3.5 mt-2 mb-4">
          <Controller
            control={control}
            name="files"
            render={({ field: { value, onChange } }) => (
              <FileLoader files={value} onChange={(files) => onChange(files)}>
                <FileLoaderButton type={AttachmentType.IMAGE}>
                  <ImageIcon />
                </FileLoaderButton>
                <FileLoaderButton type={AttachmentType.VIDEO}>
                  <VideoIcon />
                </FileLoaderButton>
                <FileLoaderButton type={AttachmentType.DOC}>
                  <PaperclipIcon />
                </FileLoaderButton>
              </FileLoader>
            )}
          />
          <Progressbar value={watch('content').length} maxValue={maxValue} />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={watch('content').length > maxValue || !watch('content').length || isLoading}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default AddPostForm;
