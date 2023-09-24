import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  type : string;
  label?: string;
  actionType?: string;
  updateState?: (e: any, args: string) => void;
}

function Input({
  name,
  label,
  placeholder,
  type,
  actionType,
  updateState,
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateState && actionType) {
      updateState(e, actionType);
      return;
    }
  };

  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        id={name}
        onChange={handleChange}
        onFocus={(e) => (e.target.type = type)}
        onBlur={(e) => (e.target.type = "text")}
        step={3600}
        {...props}
        className="bg-base-light border border-gray-300 text-primary-1100 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
}

export default Input;
