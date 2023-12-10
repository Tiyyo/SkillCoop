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
      defaultValue={unZonedTime ?? 'NC'}
      disabled={disabled}
      className={`bg-base-light border border-gray-300 font-semibold text-primary-1100
            text-xs rounded-lg block w-full h-7 pl-2  border-none`}
    />
  );
}

export default DisabledInputTimePicker;
