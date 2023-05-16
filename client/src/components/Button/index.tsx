import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: VoidFunction;
  outline?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, outline, onClick, disabled = false, className = '' }) => (
  <button
    type="submit"
    className={clsx(
      'inline-block shrink-0 rounded-md border border-lightgreen px-12 py-3 text-sm font-medium transition focus:outline-none focus:ring active:text-blue-500',
      disabled && 'bg-opacity-50',
      outline ? 'bg-transparent text-lightgreen hover:text-darkgreen' : 'bg-lightgreen text-white hover:bg-darkgreen',
      className
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  outline: false,
  className: '',
};

export default Button;
