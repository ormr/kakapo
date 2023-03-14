import React, { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type = 'text', name, placeholder, value, onChange, errorMessage },
    ref
  ) => (
    <>
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
      <div className="text-red-600">{errorMessage && errorMessage}</div>
    </>
  )
);

export default Input;
