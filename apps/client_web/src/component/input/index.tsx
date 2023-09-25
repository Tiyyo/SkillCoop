import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type: string;
  label?: string;
  updateState?: (args: any) => void;
  children?: React.ReactNode;
}

function Input({
  name,
  label,
  placeholder,
  type,
  updateState,
  children,
  ...props
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateState) {
      updateState(e.target.value);
      return;
    }
  };

  return (
    <label
      htmlFor={name}
      className="block text-md font-semibold text-primary-1100 w-full"
    >
      <p className="py-2">{label}</p>
      <div className="relative">
        <input
          name={name}
          placeholder={placeholder}
          id={name}
          onChange={handleChange}
          onFocus={(e) => (e.target.type = type)}
          onBlur={(e) => (e.target.type = "text")}
          step={3600}
          {...props}
          className="bg-base-light border border-gray-300 text-primary-1100 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10.5 pl-10"
        />
        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-primary-600">
          {children}
        </div>
      </div>
    </label>
  );
}

export default Input;
