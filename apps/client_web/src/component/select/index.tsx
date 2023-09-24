import type { ComponentPropsWithoutRef } from "react";

type Option = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  name: string;
  updateState?: (e: any, args: string) => void;
  actionType?: string;
  props?: any;
  options: Option[];
  placeholder?: string;
}

function SelectInput({
  label,
  name,
  updateState,
  actionType,
  placeholder,
  options,
  ...props
}: SelectInputProps & { actionType: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (updateState && actionType) {
      updateState(e, actionType);
      return;
    }
  };
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        name={name}
        className="bg-base-light border text-primary-1100 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 "
        onChange={handleChange}
        {...props}
      >
        <option>{placeholder}</option>
        {options.map((option: any) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
