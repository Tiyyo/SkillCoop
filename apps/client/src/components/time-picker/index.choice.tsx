type ChoiceProps = {
  value: number | string;
  variant?: 'hours' | 'minutes';
};

function Choice({ value, variant }: ChoiceProps) {
  const styleHours = 'mx-10';
  return (
    <option value={value} className={variant === 'hours' ? styleHours : ''}>
      {value}
    </option>
  );
}

export default Choice;
