import { FC, ReactNode, useContext } from 'react';
import FilesContext from './context';
import { AttachmentType } from './utils';

interface FileLoaderButtonProps {
  children: ReactNode;
  type: AttachmentType;
}

const FileLoaderButton: FC<FileLoaderButtonProps> = ({ type, children }) => {
  const { htmlForName, addFile } = useContext(FilesContext);

  return (
    <label htmlFor={htmlForName} className="flex items-center">
      <button type="button" onClick={() => addFile(type)} className="[&>*]:w-5 [&>*]:h-5">
        {children}
      </button>
    </label>
  );
};

export default FileLoaderButton;
