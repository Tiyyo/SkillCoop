import {
  useState,
  type ComponentPropsWithoutRef,
  useEffect,
  useId,
} from 'react';
import Choice from './index.choice';
import { useMutation } from '@tanstack/react-query';
import DisabledInputTimePicker from './disabled-input';
import { displayOneDigitWith2Digit } from '../../utils/display-number';

interface InputTimeProps extends ComponentPropsWithoutRef<'input'> {
  type: string;
  label?: string;
  updateState?: (args: any) => void;
  children?: React.ReactNode;
  error?: boolean;
  defaultValues?: string;
  updateData?: Record<string, string | number>;
  mutateOnBlur?: any;
  mutateKey?: string;
  date?: string;
  disabled?: boolean;
}

function InputTime({
  name,
  label,
  updateState,
  children,
  error,
  defaultValues,
  updateData,
  date,
  mutateKey,
  mutateOnBlur,
  disabled,
  ...props
}: InputTimeProps) {
  const idHoursComponent = useId();
  const idMinutesComponent = useId();
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const { mutate } = useMutation((data: Record<string, string | number>) => {
    if (!mutateOnBlur) return;
    return mutateOnBlur(data);
  });
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | undefined;
    minutes: number | undefined;
    miliseconds: number;
  }>({
    hours: undefined,
    minutes: undefined,
    miliseconds: 0.0,
  });

  const avaiableMinutesChoice = ['00', 15, 30, 45];
  const avaiableHoursChoice = new Array(24)
    .fill(0)
    .map((_, index) => displayOneDigitWith2Digit(index));

  useEffect(() => {
    setHasError(false);
    if (selectedTime.hours && selectedTime.minutes) {
      const formatedTime = `${selectedTime.hours}:${selectedTime.minutes}:0.000`;
      if (updateState) {
        updateState(formatedTime);
      }
      if (mutateOnBlur && updateData) {
        const startDate = date?.split(' ')[0];
        updateData[mutateKey as keyof typeof updateData] =
          startDate + ' ' + formatedTime;
        mutate(updateData);
      }
    }
  }, [selectedTime]);

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
          <DisabledInputTimePicker
            name={name}
            disabled={disabled}
            defaultTime={defaultValues}
          />
        ) : (
          <div className="relative">
            <input
              name={name}
              id={name}
              {...props}
              className={`bg-base-light border text-primary-1100 text-xs rounded-lg
           focus:ring-primary-800 focus:border-primary-800 block w-full h-7 pl-10`}
            />
            <select
              id="hours"
              className="absolute top-0 left-0 w-1/2 max-h-28 overflow-y-auto 
            h-7 flex text-end pr-10 bg-transparent"
              onChange={(e) =>
                setSelectedTime({
                  ...selectedTime,
                  hours: Number(e.target.value),
                })
              }
              defaultValue={
                displayOneDigitWith2Digit(
                  Number(defaultValues?.split(':')[0]),
                ) ?? ''
              }
            >
              {avaiableHoursChoice.map((hour) => (
                <Choice
                  key={hour + idHoursComponent}
                  value={hour}
                  variant="hours"
                />
              ))}
            </select>
            <select
              id="minutes"
              className="absolute top-0 right-0 w-1/2 max-h-28 h-7 pl-10 bg-transparent"
              onChange={(e) =>
                setSelectedTime({
                  ...selectedTime,
                  minutes: Number(e.target.value),
                })
              }
              defaultValue={
                displayOneDigitWith2Digit(
                  Number(defaultValues?.split(':')[1]),
                ) ?? ''
              }
            >
              {avaiableMinutesChoice.map((minute) => (
                <Choice key={minute + idMinutesComponent} value={minute} />
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputTime;
