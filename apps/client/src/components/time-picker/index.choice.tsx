type ChoiceProps = {
  value: number | string;
  variant?: 'hours' | 'minutes';
};

function Choice({ value, variant }: ChoiceProps) {
  const styleHours = 'mx-auto bg-base';
  return (
    <option
      value={value}
      className={
        variant === 'hours'
          ? styleHours
          : 'mx-auto border border-border bg-base'
      }
    >
      {value}
    </option>
  );
}

export default Choice;
