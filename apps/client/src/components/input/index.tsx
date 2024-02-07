import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';
import useResetError from '../../hooks/useResetError';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  type?: string;
  label?: string;
  updateState?: (...args: any) => void;
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  high?: boolean;
  activeStep?: boolean;
}

function Input({
  name,
  label,
  placeholder,
  type = 'text',
  updateState,
  children,
  error,
  disabled,
  className,
  activeStep,
  high,
  ...props
}: InputProps) {
  const { hasError, setHasError } = useResetError(error);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    if (updateState) {
      updateState(e.target.value);
      return;
    }
  };

  return (
    <>
      <div className="flex w-full items-center gap-x-2.5 py-4">
        <div
          className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
        >
          {children}
        </div>
        <div className="flex flex-grow flex-col gap-y-1">
          <label
            htmlFor={name}
            className="ml-2 block h-4 text-xs font-medium text-grey-sub-text "
          >
            {label}
          </label>
          <input
            name={name}
            placeholder={placeholder}
            id={name}
            onChange={handleChange}
            onFocus={(e) => (e.target.type = type)}
            step={activeStep ? 3600 : 1}
            disabled={disabled}
            {...props}
            className={cn(
              `block h-7 w-full rounded-lg
               border border-bubble bg-base-light pl-2 text-sm 
               font-medium text-primary-1100 placeholder:font-medium 
               placeholder:text-light`,
              disabled && 'border-none',
              hasError && 'ring-2 ring-error',
              high ? 'h-10' : 'h-7',
              className,
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Input;
