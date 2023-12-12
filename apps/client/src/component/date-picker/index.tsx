import { useEffect, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import dateHandler from '../../utils/date.handler';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

type InputDateProps = {
  updateState?: (e: any) => void;
  actionType?: string;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  mutateKey?: string;
  disabled?: boolean;
  updateData?: Record<string, string | number>;
  high?: boolean;
};

function InputDate({
  updateState,
  label,
  defaultValue,
  error,
  disabled,
  high,
}: InputDateProps) {
  const today = new Date();
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const options = {
    title: 'Select a date',
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    minDate: new Date(dateHandler.getTodayFormatedForInput()),
    theme: {
      background: 'bg-base-light',
      todayBtn:
        'bg-primary-100 hover:bg-primary-500 duration-300 hover:text-dark',
      clearBtn: 'bg-base border border-primary-500',
      icons: 'none',
      text: 'text-primary-1100',
      input: `w-full font-semibold text-sm bg-base-light ${
        high ? 'h-10' : 'h-7'
      } ${hasError ? 'border-2 border-error' : ''}`,
      inputIcon: `${hasError ? 'text-error' : 'text-primary-600'}`,
      selected: 'bg-primary-800',
      disabledText: 'text-gray-200',
    },
    icons: {
      prev: () => <ArrowLeft size={14} />,
      next: () => <ArrowRight size={14} />,
    },
    datepickerClassNames: 'top-12 left-1/2 -translate-x-1/2 ',
    defaultDate: new Date(defaultValue || today),
    language: 'en',
  };

  const [show, setShow] = useState<boolean>(false);

  const getDateFormatedLikeInputDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day}`;
  };

  const handleChange = (selectedDate: Date) => {
    setHasError(false);
    const formatDate = getDateFormatedLikeInputDate(selectedDate);
    if (updateState) {
      updateState(formatDate);
    }
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const getDefaultDate = (date?: string) => {
    if (!date) return '';

    const formatDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
    return formatDate;
  };

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <div className="relative w-full flex gap-x-2.5 items-center py-4">
      <div
        className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
      >
        <Calendar />
      </div>
      <div className="flex flex-col gap-y-1 flex-grow">
        <div className="block h-4 ml-2 text-xs font-medium text-grey-sub-text">
          {label}
        </div>
        {disabled ? (
          <input
            type="text"
            defaultValue={getDefaultDate(defaultValue)}
            disabled={disabled}
            className={`bg-base-light border border-gray-300 
            font-semibold text-primary-1100 text-xs rounded-lg block w-full 
            h-7 pl-2 border-none`}
          />
        ) : (
          <Datepicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default InputDate;
