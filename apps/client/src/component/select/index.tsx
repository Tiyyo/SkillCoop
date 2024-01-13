import { type ComponentPropsWithoutRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { useEvent } from '../../store/event.store';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';

type Option = {
  label: string;
  value: number | string;
};

interface SelectInputProps extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: string;
  updateState?: (args: any) => void;
  props?: any;
  options: Option[];
  error?: boolean;
  mutateKey?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  high?: boolean;
}

function SelectInput({
  label,
  name,
  updateState,
  options,
  children,
  error,
  mutateKey,
  disabled,
  high,
  ...props
}: SelectInputProps) {
  const { t } = useTranslation('event');
  const idComponent = useId();
  const { data: event } = useEvent();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      mutateKey === 'required_participants' &&
      event?.confirmed_participants &&
      Number(e.target.value) < event?.confirmed_participants
    ) {
      toast.error(t('youCannotUpdateMoreThanSet'));
      return;
    }
    if (updateState) {
      updateState(e.target.value);
    }
  };

  return (
    <div className="w-full flex gap-x-2.5 items-center py-4">
      <div className={`basis-7 ${error ? 'text-error' : 'text-primary-100'}`}>
        {children}
      </div>
      <div className="flex flex-col gap-y-1 flex-grow">
        <label
          htmlFor={name}
          className="block h-4 ml-2 text-xs font-medium text-grey-sub-text"
        >
          {label}
        </label>
        {disabled ? (
          <input
            type="text"
            className="bg-base-light border border-gray-300 
            font-semibold text-primary-1100 text-xs rounded-lg 
            block w-full h-7 pl-2  border-none"
            disabled={disabled}
            defaultValue={
              mutateKey === 'duration'
                ? props.defaultValue + ' min'
                : props.defaultValue
            }
          />
        ) : (
          <select
            name={name}
            className={cn(
              `bg-base-light border text-primary-1100 text-sm 
              font-medium rounded-lg 
              focus:ring-primary-800focus:border-primary-800
              block w-full h-7 pl-2`,
              high ? 'h-10' : 'h-7',
              error && 'ring-2 ring-error',
            )}
            onChange={handleChange}
            {...props}
          >
            <option className="text-xs font-light text-ligh">
              {t('pickAnOption')}
            </option>
            {options.map((option: any, index) => (
              <option key={index + idComponent} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default SelectInput;
