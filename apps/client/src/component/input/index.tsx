import { useState, type ComponentPropsWithoutRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useMutation } from '@tanstack/react-query';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  type: string;
  label?: string;
  updateState?: (args: any) => void;
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  mutateOnBlur?: any;
  mutateKey?: string;
  updateData?: Record<string, string | number>;
}

function Input({
  name,
  label,
  placeholder,
  type,
  updateState,
  mutateOnBlur,
  children,
  error,
  disabled,
  className,
  updateData,
  mutateKey,
  ...props
}: InputProps) {
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const { mutate } = useMutation((data: Record<string, string | number>) => {
    if (!mutateOnBlur) return;
    return mutateOnBlur(data);
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    if (updateState) {
      updateState(e.target.value);
      return;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!updateData) return;
    updateData[mutateKey as keyof typeof updateData] = e.target.value;
    if (mutateOnBlur) {
      mutate(updateData);
      return;
    }
  };

  useEffect(() => {
    setHasError(error);
  }, [error]);
  return (
    <>
      <div className="w-full flex gap-x-2.5 items-center py-4">
        <div
          className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
        >
          {children}
        </div>
        <div className="flex flex-col gap-y-1 flex-grow">
          <label
            htmlFor={name}
            className="block h-4 ml-2 text-xs font-medium text-grey-sub-text "
          >
            {label}
          </label>
          <input
            name={name}
            placeholder={placeholder}
            id={name}
            onChange={handleChange}
            onFocus={(e) => (e.target.type = type)}
            onBlur={handleBlur}
            step={3600}
            disabled={disabled}
            {...props}
            className={cn(
              `bg-base-light border border-gray-300 font-medium text-primary-1100 
            text-sm rounded-lg block w-full h-7 pl-2`,
              disabled && 'border-none',
              hasError && 'border-2 border-error',
              className,
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Input;
