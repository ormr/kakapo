import clsx from 'clsx';
import { FC } from 'react';

interface PostFilesPreviewProps {
  fileIds: string[];
}

interface FilePositionsStyles {
  [key: number]: {
    wrapper: string;
    figure: (index: number) => string | undefined;
  };
}

const filePositionsByLength: FilePositionsStyles = {
  1: {
    wrapper: 'grid-cols-1',
    figure: () => 'h-[516px]',
  },
  2: {
    wrapper: 'grid-cols-2 gap-1',
    figure: () => 'h-[516px]',
  },
  3: {
    wrapper: 'grid-cols-2 gap-1',
    figure: (index: number) => {
      const map: { [key: number]: string } = {
        0: 'h-[16rem]',
        1: 'row-span-2 h-full',
        2: 'h-[16rem]',
      };

      return map[index];
    },
  },
};

const PostFilesPreview: FC<PostFilesPreviewProps> = ({ fileIds }) => {
  const currentFilesPositionStyles = filePositionsByLength[fileIds.length];

  return (
    <div className={clsx('grid auto-rows-max', currentFilesPositionStyles.wrapper)}>
      {fileIds.map((id, index) => (
        <figure key={id} className={clsx('w-full', currentFilesPositionStyles.figure(index))}>
          <img className="w-full h-full object-cover rounded-lg" src={`/local-files/${id}`} alt={`post-${index}`} />
        </figure>
      ))}
    </div>
  );
};

export default PostFilesPreview;
