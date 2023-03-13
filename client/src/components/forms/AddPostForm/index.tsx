import React, { FC, useRef } from 'react';
import ImageIcon from '../../../assets/ImageIcon';
import PaperclipIcon from '../../../assets/Paperclip';
import VideoIcon from '../../../assets/VideoIcon';
import useOnClickOutside from '../../../hooks/useOutsideClick';
import Button from '../../Button';
import TextArea from '../../Textarea';
import Progressbar from './ProgressBar';
import FileLoader, { AttachmentType } from '../../FileLoader';
import FileLoaderButton from '../../FileLoader/FileLoaderButton';
import { useForm, Controller } from 'react-hook-form';

interface AddPostFormProps {
  onFormClose: VoidFunction;
}

const defaultValues = {
  text: '',
};

/*
 * TODO:
 * 1. Подключить к API
 */

const AddPostForm: FC<AddPostFormProps> = ({ onFormClose }) => {
  const maxValue = 250;
  const formRef = useRef() as any;
  const { control, watch, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    onFormClose();
  };

  useOnClickOutside(formRef, () => onFormClose());

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
      <div
        ref={formRef}
        className="w-full h-72 fixed bottom-0 bg-white py-6 px-3"
      >
        <h3 className="mb-3 font-bold">Create post</h3>
        <Controller
          control={control}
          name="text"
          render={({ field: { value, onChange } }) => (
            <TextArea value={value} onChange={onChange} />
          )}
        />
        <div className="w-full flex items-center gap-3.5 mt-2 mb-4">
          <FileLoader>
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
          <Progressbar value={watch('text').length} maxValue={maxValue} />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={watch('text').length > maxValue || !watch('text').length}
        />
      </div>
    </div>
  );
};

export default AddPostForm;
