import { useState, type ComponentPropsWithoutRef, useEffect } from "react";
import Choice from "./index.choice";

interface InputTimeProps extends ComponentPropsWithoutRef<"input"> {
  type: string;
  label?: string;
  updateState?: (args: any) => void;
  children?: React.ReactNode;
  error?: boolean;
  defaultValues?: string 
}

function InputTime({
  name,
  label,
  updateState,
  children,
  error,
  defaultValues,
  ...props
}: InputTimeProps) {
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | undefined;
    minutes: number | undefined;
    miliseconds: number;
  }>({
    hours: undefined,
    minutes: undefined,
    miliseconds: 0.000,
  });


  const displayNumberWithZeroBehind = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  // TODO : fix this
  const avaiableMinutesChoice = ["00", 15, 30, 45];
  const avaiableHoursChoice = new Array(24)
    .fill(0)
    .map((_, index) => displayNumberWithZeroBehind(index));

useEffect(() => {
    setHasError(false);
  if (selectedTime.hours && selectedTime.minutes) {
    const formatedTime = `${selectedTime.hours}:${selectedTime.minutes}:0.000`;
    if (updateState) {
      updateState(formatedTime);
    }
  }
}, [selectedTime])

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <label
      htmlFor={name}
      className="block text-md font-semibold text-primary-1100 w-full"
    >
      <p className="py-2">{label}</p>
      <div className="relative">
        <input
          name={name}
          id={name}
          {...props}
          className={`bg-base-light border text-primary-1100 ${
            hasError ? "border-2 border-error" : ""
          } text-xs rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full h-10.5 pl-10`}
        />
        <div className={`absolute top-1/2 left-2 -translate-y-1/2  ${
            hasError ? "text-error" : "text-primary-600"
          }`}>
          {children}
        </div>
        <select
          id="hours"
          className="absolute top-0 left-0 w-1/2 max-h-28 overflow-y-auto h-10.5 flex text-end pr-10 bg-transparent"
          onChange={(e) => setSelectedTime({ ...selectedTime, hours: Number(e.target.value)})}
          defaultValue={displayNumberWithZeroBehind(Number(defaultValues?.split(":")[0])) ?? ""}
        >
          {avaiableHoursChoice.map((hour) => (
            <Choice value={hour} variant="hours"/>
          ))}
        </select>
        <select
          id="minutes"
          className="absolute top-0 right-0 w-1/2 max-h-28 h-10.5 pl-10 bg-transparent"
          onChange={(e) => setSelectedTime({ ...selectedTime, minutes: Number(e.target.value)})} 
          defaultValue={displayNumberWithZeroBehind(Number(defaultValues?.split(":")[1])) ?? ""}
        >
          {avaiableMinutesChoice.map((minute) => (
            <Choice value={minute} />
          ))}
        </select>
      </div>
      <div>

      </div>
    </label>
  );
}

export default InputTime;
