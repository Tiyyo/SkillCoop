import { displayOneDigitWith2Digit } from '../../utils/display-number';

type DisabledInputTimePickerProps = {
  name?: string;
  defaultTime?: string;
  disabled: boolean;
};

function DisabledInputTimePicker({
  name,
  defaultTime,
  disabled,
}: DisabledInputTimePickerProps) {
  const hours = displayOneDigitWith2Digit(Number(defaultTime?.split(':')[0]));
  const minutes = displayOneDigitWith2Digit(Number(defaultTime?.split(':')[1]));
  const unZonedTime = hours + ':' + minutes;

  return (
    <input
      name={name}
      type="text"
      id={name}
      value={unZonedTime ?? 'NC'}
      disabled={disabled}
      className={`block h-7 w-full 
      rounded-lg border border-none border-gray-300 bg-base-light 
      pl-2 text-xs font-semibold text-primary-1100`}
    />
  );
}

export default DisabledInputTimePicker;
