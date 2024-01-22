import { type ComponentPropsWithoutRef, useId } from 'react';
import { cn } from '../../lib/utils';
import { useEvent } from '../../stores/event.store';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import useResetError from '../../hooks/useResetError';

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
  const { hasError, setHasError } = useResetError(error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasError(false);
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
    <div className="flex w-full items-center gap-x-2.5 py-4">
      <div
        className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
      >
        {children}
      </div>
      <div className="flex flex-grow flex-col gap-y-1">
        <label
          htmlFor={name}
          className="ml-2 block h-4 text-xs font-medium text-grey-sub-text"
        >
          {label}
        </label>
        {disabled ? (
          <input
            type="text"
            className="block h-7 w-full 
            rounded-lg border border-none border-gray-300 
            bg-base-light pl-2 text-xs font-semibold  text-primary-1100"
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
              `focus:ring-primary-800focus:border-primary-800 block h-7 w-full 
              rounded-lg border 
              bg-base-light
              pl-2 text-sm font-medium text-primary-1100`,
              high ? 'h-10' : 'h-7',
              hasError && 'ring-2 ring-error',
            )}
            onChange={handleChange}
            {...props}
          >
            <option className="text-ligh text-xs font-light">
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
