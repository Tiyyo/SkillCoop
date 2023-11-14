import { useMutation } from '@tanstack/react-query';
import {
  useState,
  type ComponentPropsWithoutRef,
  useEffect,
  useId,
} from 'react';

type Option = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  updateState?: (args: any) => void;
  props?: any;
  options: Option[];
  error?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  mutateOnBlur?: any;
  mutateKey?: string;
  updateData?: Record<string, string | number>;
}

const nameSelectInput = ['duration', 'required_participants'];

function SelectInput({
  label,
  name,
  updateState,
  mutateOnBlur,
  options,
  children,
  error,
  updateData,
  mutateKey,
  disabled,
  ...props
}: SelectInputProps) {
  const idComponent = useId();
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const { mutate } = useMutation((data: Record<string, string | number>) => {
    if (!mutateOnBlur) return;
    return mutateOnBlur(data);
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasError(false);
    if (updateState) {
      updateState(e.target.value);
    }
    if (!updateData) return;
    // TODO abstract this logic in a switch case or something
    // like a pool of key and search if mutateKey is in the pool

    // No idea why I have to do this
    let value: number | string = '';
    if (mutateKey && nameSelectInput.includes(mutateKey))
      value = Number(e.target.value);
    updateData[mutateKey as keyof typeof updateData] = value;
    if (mutateOnBlur) {
      mutate(updateData);
    }
  };

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block py-2 text-md font-semibold text-primary-1100"
      >
        {label}
      </label>
      <div className={`relative `}>
        <div
          className={`absolute top-1/2 left-2 -translate-y-1/2  ${
            hasError ? 'text-error' : 'text-primary-600'
          }`}
        >
          {children}
        </div>
        {disabled ? (
          <input
            type="text"
            className="bg-base-light border border-gray-300 font-semibold text-primary-1100 
            text-xs rounded-lg block w-full h-10.5 pl-10 border-none"
            disabled={disabled}
            defaultValue={
              mutateKey === 'duration'
                ? props.defaultValue + ' min'
                : props.defaultValue
            }
          />
        ) : (
          <select
            name={name}
            className={`bg-base-light border text-primary-1100 ${
              hasError ? 'border-2 border-error' : ''
            } text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 
            block w-full h-10.5 pl-10`}
            onChange={handleChange}
            {...props}
          >
            <option className="text-xs font-light text-ligh">
              Pick an option
            </option>
            {options.map((option: any, index) => (
              <option key={index + idComponent} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default SelectInput;
