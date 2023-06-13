import { ChangeEvent, HTMLInputTypeAttribute, forwardRef } from 'react';

interface InputProps {
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  errorMessage?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type = 'text', name, placeholder, value, onChange, errorMessage }, ref) => (
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

Input.defaultProps = {
  id: '',
  type: 'text',
  placeholder: '',
  name: '',
  value: undefined,
  errorMessage: undefined,
  onChange: undefined,
};

export default Input;
