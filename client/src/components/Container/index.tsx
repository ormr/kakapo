import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={clsx('px-10', className)}>{children}</div>
);

Container.defaultProps = {
  className: '',
};

export default Container;
