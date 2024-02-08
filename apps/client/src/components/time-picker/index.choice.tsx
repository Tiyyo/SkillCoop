type ChoiceProps = {
  value: number | string;
  variant?: 'hours' | 'minutes';
};

function Choice({ value, variant }: ChoiceProps) {
  const styleHours = 'mx-auto bg-base text-primary-1100';
  return (
    <option
      value={value}
      className={
        variant === 'hours'
          ? styleHours
          : 'border-border mx-auto border bg-base text-primary-1100'
      }
    >
      {value}
    </option>
  );
}

export default Choice;
