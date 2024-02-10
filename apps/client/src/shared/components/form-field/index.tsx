import { useEffect, useState } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils';
import { XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('zod');
  // TDOD: Move this logic into a custom hook
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
             foucs:ring-1 peer block w-full appearance-none 
             rounded-lg border border-border border-opacity-20
             bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-text-base 
              focus:ring-primary-100 `,
            props.disabled && 'cursor-not-allowed border-none text-light',
          )}
          defaultValue={props.defaultValue}
          {...props}
          {...(register ? { ...register(name) } : null)}
        />
        <label
          htmlFor={name}
          className={`peer-focus:text-secondary-400 absolute 
          left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform 
          bg-base-light px-2 text-sm text-grey-sub-text duration-300 
          peer-placeholder-shown:top-1/2 
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:scale-100 
          peer-focus:top-2 peer-focus:-translate-y-4 
          peer-focus:scale-75 peer-focus:px-2`}
        >
          {label}
        </label>
        <div
          className={`text-black-light peer-focus:text-secondary-300 
          absolute right-2 top-1/2 -translate-y-1/2 transform
          text-primary-700`}
          onClick={() => toggleIcon()}
        >
          {!icon && subicon ? subicon : children}
        </div>
      </div>
      {errorText && (
        <div
          className={`flex w-full items-center 
              gap-x-2 px-2 py-1 text-center text-xs 
              font-semibold text-error`}
        >
          <XCircle size={16} className="flex-shrink-0" />
          <p>{t(errorText)}</p>
        </div>
      )}
    </div>
  );
}

export default FormField;
