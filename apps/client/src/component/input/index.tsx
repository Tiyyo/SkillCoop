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
    <label
      htmlFor={name}
      className="block text-md font-semibold text-primary-1100 w-full">
      <p className="py-2">{label}</p>
      <div className="relative">
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
            `bg-base-light border border-gray-300 text-primary-1100 text-xs rounded-lg block w-full h-10.5 pl-10 `,
            disabled && 'border-none',
            hasError && 'border-2 border-error',
            className
          )}
        />
        <div
          className={`absolute top-1/2 left-2 -translate-y-1/2  ${
            hasError ? 'text-error' : 'text-primary-600'
          }`}>
          {children}
        </div>
      </div>
    </label>
  );
}

export default Input;
