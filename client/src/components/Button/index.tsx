import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: VoidFunction;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
  <button className={clsx('w-full p-4 bg-black text-white border-1', disabled && 'bg-opacity-25')} onClick={onClick} disabled={disabled}>
    Post
  </button>
);

export default Button;
