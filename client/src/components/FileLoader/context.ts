import { createContext } from 'react';
import { AttachmentType } from '.';

interface FilesContextProps {
  htmlForName: string;
  addFile: (type: AttachmentType) => void;
}

export const FilesContext = createContext<FilesContextProps>(null!);
