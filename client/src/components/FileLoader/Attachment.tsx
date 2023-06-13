import { FC } from 'react';
import PlusIcon from '../../assets/PlusIcon';

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
        <button type="button" className="p-1 bg-red-500 rounded-full rotate-45" onClick={handleDelete}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Attachment;
