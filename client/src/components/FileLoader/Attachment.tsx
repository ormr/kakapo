import React, { FC, useContext } from 'react';
import { AttachmentType } from '.';
import PlusIcon from '../../assets/PlusIcon';
import { FilesContext } from './context';

interface AttachmentProps {
  fileName: string;
  onDelete: VoidFunction;
}

const Attachment: FC<AttachmentProps> = ({ fileName, onDelete }) => {
  // const { files, setFiles } = useContext(FilesContext);

  const handleDelete = () => {
    onDelete();
  };

  // const handleClick = () => {
  //   setFiles([...files, {}])
  // }

  return (
    <div className="flex justify-between w-full p-3 border-2 border-neutral-300 my-1">
      <div>{fileName}</div>
      <div>
        <button className="p-1 bg-red-500 rounded-full rotate-45">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Attachment;
