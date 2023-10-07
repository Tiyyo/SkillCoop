import { useState } from 'react';
import capitalize from '../../utils/capitalize';
import { cn } from '../../lib/utils';

interface FieldsetRadioInputProps {
  name: string;
  options: string[];
}

function FieldsetRadioInput({ name, options }: FieldsetRadioInputProps) {
  const [currentIDActive, setCurrentIDActive] = useState<string>('');

  const handleChangeFieldset = (e) => {
    setCurrentIDActive(e.target.id);
  };

  return (
    <fieldset
      className="flex flex-col items-center justify-center"
      name={name}
      onChange={handleChangeFieldset}>
      <legend className="mt-3 py-1 px-4 self-start font-semibold text-primary-1100">
        {capitalize(name)}
      </legend>
      <div className="flex text-xxs">
        {options.length > 0 &&
          options.map((option) => (
            <label
              key={`${name}_${option}`}
              htmlFor={`${name}_${option}`}
              className={cn(
                'px-3 py-1.5 border border-primary-500 bg-base-light first-of-type:rounded-l-lg last-of-type:rounded-r-lg',
                `${name}_${option}` === currentIDActive &&
                  'bg-primary-500 text-white'
              )}>
              {capitalize(option)}
              <input
                type="radio"
                name={name}
                id={`${name}_${option}`}
                value={option}
                hidden
              />
            </label>
          ))}
      </div>
    </fieldset>
  );
}

export default FieldsetRadioInput;
