import {
  useState,
  type ComponentPropsWithoutRef,
  useEffect,
  useId,
} from 'react';
import Choice from './index.choice';
import DisabledInputTimePicker from './disabled-input';
/* eslint-disable*/
import { displayOneDigitWith2Digit } from '../../../shared/utils/display-number';
/* eslint-enable*/
import { cn } from '../../../lib/utils';

interface InputTimeProps extends ComponentPropsWithoutRef<'input'> {
  type: string;
  label?: string;
  updateState?: (args: any) => void;
  children?: React.ReactNode;
  error?: boolean;
  defaultValues?: string;
  date?: string;
  disabled?: boolean;
  high?: boolean;
}

function InputTime({
  name,
  label,
  updateState,
  children,
  error,
  defaultValues,
  disabled,
  high,
  ...props
}: InputTimeProps) {
  const idHoursComponent = useId();
  const idMinutesComponent = useId();
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const [count, setCount] = useState<number>(0);

  // Expected behavior:
  // 1. User dont click on input so count is 0
  // so selectedTimes.hours and selectedTimes.minutes are undefined
  // Input display an error if we try to submit the form
  // 2. User click on input so count is 1
  // so selectedTimes.hours or selectedTimes.minutes is defnined
  // to update the state we need to have both
  // selectedTimes.hours and selectedTimes.minutes
  // defined so when count is 2 we check if one of
  // them is undefined and if it is we set it to 00
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | string | undefined;
    minutes: number | string | undefined;
    miliseconds: number | string;
  }>({
    hours: count < 1 ? undefined : '00',
    minutes: count < 1 ? undefined : '00',
    miliseconds: '0.000',
  });

  const avaiableMinutesChoice = ['00', 15, 30, 45];
  const avaiableHoursChoice = new Array(24)
    .fill(0)
    .map((_, index) => displayOneDigitWith2Digit(index));

  useEffect(() => {
    setHasError(false);
    if (selectedTime.hours && selectedTime.minutes) {
      /* eslint-disable max-len */
      const formatedTime = `${selectedTime.hours}:${selectedTime.minutes}:0.000`;
      /* eslint-enable max-len */
      if (updateState) {
        updateState(formatedTime);
      }
    }
    setCount(count + 1);
  }, [selectedTime]);

  useEffect(() => {
    if (count === 2) {
      if (selectedTime.hours === undefined) {
        setSelectedTime({
          ...selectedTime,
          hours: '00',
        });
      }
      if (selectedTime.minutes === undefined) {
        setSelectedTime({
          ...selectedTime,
          minutes: '00',
        });
      }
    }
  }, [count]);

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <div className="flex w-full items-center gap-x-2.5 py-4">
      <div
        className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
      >
        {children}
      </div>
      <div className="flex flex-grow flex-col gap-y-1">
        <label
          htmlFor={name}
          className="ml-2 block h-4 text-xs font-medium text-grey-sub-text"
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
              className={cn(
                `block w-full rounded-lg border border-border bg-base-light
                 pl-10 text-xs text-primary-1100 focus-within:outline-none 
              focus:ring-1 focus:ring-primary-600
           `,
                high ? 'h-10' : 'h-7',
                hasError && 'ring-2 ring-error',
              )}
            />
            <select
              id="hours"
              className={cn(
                `absolute left-0 top-0 flex h-7 max-h-28 w-1/2 
                 overflow-y-auto rounded-lg bg-transparent pr-10 
                 text-end text-light focus-within:outline-none 
                 focus:ring-1 focus:ring-primary-700`,
                high ? 'h-10' : 'h-7',
              )}
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
              className={cn(
                `absolute right-0 top-0 h-7 max-h-28 w-1/2 
                 rounded-lg bg-transparent pl-10 text-light 
                 focus-within:outline-none focus:ring-1 focus:ring-primary-700`,
                high ? 'h-10' : 'h-7',
              )}
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
