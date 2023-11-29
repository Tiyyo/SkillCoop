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
  mutateKey?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SelectInput({
  label,
  name,
  updateState,
  options,
  children,
  error,
  mutateKey,
  disabled,
  ...props
}: SelectInputProps) {
  const idComponent = useId();
  const [hasError, setHasError] = useState<boolean | undefined>(error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasError(false);
    if (updateState) {
      updateState(e.target.value);
    }
  };

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <div className="w-full flex gap-x-2.5 items-center py-4">
      <div
        className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
      >
        {children}
      </div>
      <div className="flex flex-col gap-y-1 flex-grow">
        <label
          htmlFor={name}
          className="block h-4 ml-2 text-xs font-medium text-grey-sub-text"
        >
          {label}
        </label>
        {disabled ? (
          <input
            type="text"
            className="bg-base-light border border-gray-300 font-semibold text-primary-1100
            text-xs rounded-lg block w-full h-7 pl-2  border-none"
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
            } text-sm font-medium rounded-lg focus:ring-primary-800 focus:border-primary-800
            block w-full h-7 pl-2`}
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
