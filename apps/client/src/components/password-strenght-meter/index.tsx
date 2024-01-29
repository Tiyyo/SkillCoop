type PasswordStrengthMeterProps = {
  password: string;
};

type Strengh = 'very weak' | 'weak' | 'medium' | 'strong' | '';

const strengthAssertion = {
  veryWeak: 'very weak',
  weak: 'weak',
  medium: 'medium',
  strong: 'strong',
  empty: '',
} as const;

const passwordTests = [
  /.{8,}/, // at least 8 characters
  /\d/, // at least one number
  /[a-z]/, // at least one lowercase
  /[A-Z]/, // at least one uppercase
  /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/, // at least one special character
];

function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const getStrength = () => {
    const strengthLevel = passwordTests.reduce((count, passwordTest) => {
      return passwordTest.test(password) ? count + 1 : count;
    }, 0);
    switch (strengthLevel) {
      case 0:
        return strengthAssertion.empty;
      case 1:
        return strengthAssertion.veryWeak;
      case 2:
        return strengthAssertion.veryWeak;
      case 3:
        return strengthAssertion.weak;
      case 4:
        return strengthAssertion.medium;
      case 5:
        return strengthAssertion.strong;
      default:
        return strengthAssertion.empty;
    }
  };
  const strenght = getStrength();

  const displayStrengthColor = (strength: Strengh, position: number) => {
    const strengthLevels = {
      [strengthAssertion.veryWeak]: 1,
      [strengthAssertion.weak]: 2,
      [strengthAssertion.medium]: 4,
      [strengthAssertion.strong]: 5,
    };
    let color = 'bg-gray-100';

    if (position <= strengthLevels[strength as keyof typeof strengthLevels]) {
      if (strength === strengthAssertion.strong) {
        color = 'bg-green-600';
      } else if (strength === strengthAssertion.medium && position < 4) {
        color = 'bg-yellow-400';
      } else if (strength === strengthAssertion.weak && position < 3) {
        color = 'bg-error-mid';
      } else if (strength === strengthAssertion.veryWeak && position < 2) {
        color = 'bg-error-mid';
      } else {
        color = 'bg-gray-100';
      }
    }
    return `rounded-full w-1/4 ${color}`;
  };

  return (
    <>
      {password !== '' && (
        <div className="flex w-full flex-col">
          <ul className="flex h-1 w-full gap-1">
            <li className={displayStrengthColor(strenght, 1)}></li>
            <li className={displayStrengthColor(strenght, 2)}></li>
            <li className={displayStrengthColor(strenght, 3)}></li>
            <li className={displayStrengthColor(strenght, 4)}></li>
          </ul>
          <div className="my-1.5 self-end text-xs text-light">{strenght}</div>
        </div>
      )}
    </>
  );
}

export default PasswordStrengthMeter;
