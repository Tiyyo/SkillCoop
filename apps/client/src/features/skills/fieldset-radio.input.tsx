import { useId, useState } from 'react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

type FieldsetRadioInputProps = {
  name: string;
  options: string[];
};

function FieldsetRadioInput({ name, options }: FieldsetRadioInputProps) {
  const { t } = useTranslation('skill');
  const idComponent = useId();
  const [currentIDActive, setCurrentIDActive] = useState<string>('');

  const handleChangeFieldset = (e: React.ChangeEvent<HTMLFieldSetElement>) => {
    setCurrentIDActive(e.target.id);
  };

  return (
    <fieldset
      className="flex max-w-md flex-col items-center justify-center"
      name={name}
      onChange={handleChangeFieldset}
    >
      <legend
        className="mt-3 self-start px-4 py-3 text-xs
         font-medium text-primary-1100"
      >
        {t(name)}
      </legend>
      <div className="flex text-xxs">
        {options.length > 0 &&
          options.map((option, index) => (
            <label
              key={index + idComponent}
              htmlFor={`${name}_${option}`}
              className={cn(
                ` cursor-pointer border border-primary-500 bg-base-light px-1.5
                 py-1.5 duration-200 
                  first-of-type:rounded-l-lg last-of-type:rounded-r-lg
                hover:bg-primary-200 lg:px-3`,
                `${name}_${option}` === currentIDActive &&
                  'bg-primary-500 text-white hover:bg-primary-500',
              )}
            >
              {t(option)}
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
