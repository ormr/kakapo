import { createContext } from 'react';
import { AttachmentType } from './utils';

interface FilesContextProps {
  htmlForName: string;
  addFile: (type: AttachmentType) => void;
}

const FilesContext = createContext<FilesContextProps>(null!);

export default FilesContext;
