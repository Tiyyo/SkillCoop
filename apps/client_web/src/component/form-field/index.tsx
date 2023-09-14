import { useState } from "react";

export type InputType = "text" | "password" | "email" | "checkbox";

interface FormFieldProps {
  name: string;
  label: string;
  type: InputType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
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
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const [icon, setIcon] = useState(true);

  function toggleIcon() {
    setIcon(!icon);
  }

  return (
    <>
      <div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          // {...register(name)}
        />
        <label htmlFor={name}>{label}</label>
        <div onClick={() => toggleIcon()}>
          {!icon && subicon ? subicon : children}
        </div>
      </div>
      {errorText && (
        <div>
          {/* <ErrorIcon /> */}
          <p>{errorText}</p>
        </div>
      )}
    </>
  );
}

export default FormField;
