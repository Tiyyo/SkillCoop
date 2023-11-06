import { useEffect, useState } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';
import { XCircle } from 'lucide-react';

interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  name: string;
  type?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
  subicon?: React.ReactNode;
  register?: any;
}

function FormField({
  error,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  children,
  subicon,
  register,
  ...props
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const [icon, setIcon] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }
    setErrorText('');
  }

  function toggleIcon() {
    setIcon(!icon);
  }

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="w-full">
      <div className="relative my-1">
        <input
          type={type === 'password' && icon ? 'text' : type}
          value={value}
          id={name}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'off' : 'on'}
          className={cn(
            `autofill:shadow-[inset_0_0_0px_1000px_rgb(255 248 242)]
             focus:border-secondary-100 border-secondary-400 peer block 
             w-full appearance-none rounded-lg border border-opacity-20 
             bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 
             focus:outline-none focus:ring-0`,
            props.disabled && 'cursor-not-allowed border-none text-light'
          )}
          defaultValue={props.defaultValue}
          {...props}
          {...register(name)}
        />
        <label
          htmlFor={name}
          className={`peer-focus:text-secondary-400 bg-base-light 
          absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 
          transform px-2 text-sm text-gray-500 duration-300 
          peer-placeholder-shown:top-1/2 
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:scale-100 
          peer-focus:top-2 peer-focus:-translate-y-4 
          peer-focus:scale-75 peer-focus:px-2`}>
          {label}
        </label>
        <div
          className={`absolute right-2 top-1/2 -translate-y-1/2 
          transform text-black-light peer-focus:text-secondary-300
          text-primary-700`}
          onClick={() => toggleIcon()}>
          {!icon && subicon ? subicon : children}
        </div>
      </div>
      {errorText && (
        <div
          className={`text-error flex w-full 
              items-center gap-x-2 px-2 py-1 text-center 
              text-xs font-semibold`}>
          <XCircle size={16} />
          <p>{errorText}</p>
        </div>
      )}
    </div>
  );
}

export default FormField;
