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
import {
  Post,
  useAddFileToPostMutation,
  useCreatePostMutation,
  useDeletePostFileMutation,
  useUpdatePostMutation,
} from '../../../services/api/PostsApi';

export interface TempPost extends Post {
  content: string;
  files: (File | string)[];
  fileIds: string[];
}

const defaultValuesForCreation = {
  content: '',
  fileIds: [],
  files: [],
};

interface AddPostFormProps {
  isCreation: boolean;
  defaultValues?: any;
  onFormClose: VoidFunction;
}

/*
 * TODO:
 * Прикрутить сохранение нескольких изображений на сервере
 * */

const AddPostForm: FC<AddPostFormProps> = ({ isCreation, defaultValues = defaultValuesForCreation, onFormClose }) => {
  const maxValue = 250;
  const formRef = useRef() as any;
  const { control, watch, handleSubmit } = useForm({
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addFileToPost] = useAddFileToPostMutation();
  const [deletePostFile] = useDeletePostFileMutation();

  const addFilesToPost = async (postId: number, files: (File | string)[], fileIds: string[]) => {
    const filesToDelete = fileIds.filter((fileId) => !files.includes(fileId));

    filesToDelete.forEach(async (fileId) => {
      await deletePostFile({ postId, fileId });
    });

    files.forEach(async (file) => {
      if (typeof file === 'object') {
        await addFileToPost({ postId, file });
      }
    });
  };

  const handleCreatePost = async ({ content, files, fileIds }: Pick<TempPost, 'content' | 'files' | 'fileIds'>) => {
    const post = await createPost({ content });

    if ('data' in post) {
      await addFilesToPost(post.data.id, files, fileIds);
    }
  };

  const handleEditPost = async ({
    id,
    content,
    files,
    fileIds,
  }: Pick<TempPost, 'id' | 'content' | 'files' | 'fileIds'>) => {
    try {
      await updatePost({ postId: id, content });

      await addFilesToPost(id, files, fileIds);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async ({ id, content, files, fileIds }: TempPost) => {
    setIsLoading(true);

    if (isCreation) {
      handleCreatePost({ content, files, fileIds });
    } else {
      handleEditPost({ id, content, files, fileIds });
    }

    setIsLoading(false);
    onFormClose();
  };

  useOnClickOutside(formRef, () => onFormClose());

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
      <div ref={formRef} className="w-full h-72 fixed bottom-0 bg-white py-6 px-3">
        <h3 className="mb-3 font-bold">{isCreation ? 'Create' : 'Edit'} post</h3>
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => <TextArea value={value} onChange={onChange} />}
        />
        <div className="w-full flex items-center gap-3.5 mt-2 mb-4">
          <Controller
            control={control}
            name="files"
            render={({ field: { onChange } }) => (
              <FileLoader fileIds={watch('fileIds')} onChange={(files) => onChange(files)}>
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
          className="w-full"
          disabled={watch('content').length > maxValue || !watch('content').length || isLoading}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

AddPostForm.defaultProps = {
  defaultValues: {
    content: '',
    files: [],
    fileIds: [],
  },
};

export default AddPostForm;
