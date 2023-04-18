import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: VoidFunction;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    type="button"
    className={clsx('w-full p-4 bg-black text-white border-1', disabled && 'bg-opacity-25', className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  className: '',
};

export default Button;
