import { useId, useState } from 'react';
import capitalize from '../../../utils/capitalize';
import { cn } from '../../../lib/utils';

type FieldsetRadioInputProps = {
  name: string;
  options: string[];
};

function FieldsetRadioInput({ name, options }: FieldsetRadioInputProps) {
  const idComponent = useId();
  const [currentIDActive, setCurrentIDActive] = useState<string>('');

  const handleChangeFieldset = (e: React.ChangeEvent<HTMLFieldSetElement>) => {
    setCurrentIDActive(e.target.id);
  };

  return (
    <fieldset
      className="flex flex-col items-center justify-center max-w-md"
      name={name}
      onChange={handleChangeFieldset}
    >
      <legend
        className="mt-3 px-4 self-start text-xs font-medium
         text-primary-1100 py-3"
      >
        {capitalize(name)}
      </legend>
      <div className="flex text-xxs">
        {options.length > 0 &&
          options.map((option, index) => (
            <label
              key={index + idComponent}
              htmlFor={`${name}_${option}`}
              className={cn(
                ` px-1.5 py-1.5 lg:px-3 border border-primary-500
                 bg-base-light first-of-type:rounded-l-lg 
                  last-of-type:rounded-r-lg cursor-pointer
                hover:bg-primary-200 duration-200`,
                `${name}_${option}` === currentIDActive &&
                  'bg-primary-500 text-white hover:bg-primary-500',
              )}
            >
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
