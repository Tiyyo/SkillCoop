import { useState, type ComponentPropsWithoutRef, useEffect } from "react";

type Option = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  name: string;
  updateState?: (args: any) => void;
  props?: any;
  options: Option[];
  error?: boolean;
  children?: React.ReactNode;
}

function SelectInput({
  label,
  name,
  updateState,
  options,
  children,
  error,
  ...props
}: SelectInputProps) {
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasError(false);
    if (updateState) {
      updateState(e.target.value);
      return;
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
            hasError ? "text-error" : "text-primary-600"
          }`}
        >
          {children}
        </div>
        <select
          name={name}
          className={`bg-base-light border text-primary-1100 ${
            hasError ? "border-2 border-error" : ""
          } text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full h-10.5 pl-10`}
          onChange={handleChange}
          {...props}
        >
          {options.map((option: any) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;
