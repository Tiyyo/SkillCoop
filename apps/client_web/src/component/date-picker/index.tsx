import { useEffect, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import dateHandler from '../../utils/date.handler';
import { Calendar } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface InputDateProps {
  updateState?: (e: any) => void;
  actionType?: string;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  mutateKey?: string;
  mutateOnBlur?: any;
  disabled?: boolean;
  updateData?: Record<string, string | number>;
}

function InputDate({
  updateState,
  label,
  defaultValue,
  error,
  updateData,
  disabled,
  mutateOnBlur,
  mutateKey,
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
      todayBtn: 'bg-primary-800',
      clearBtn: 'bg-base border border-primary-500',
      icons: '',
      text: 'text-primary-1100',
      input: `w-full ${hasError ? 'border-2 border-error' : ''}`,
      inputIcon: `${hasError ? 'text-error' : 'text-primary-600'}`,
      selected: 'bg-primary-800',
      disabledText: 'text-gray-200',
    },
    icons: {
      prev: '',
      next: '',
    },
    datepickerClassNames: 'top-12 left-1/2 -translate-x-1/2 ',
    defaultDate: new Date(defaultValue || today),
    language: 'en',
  };

  const [show, setShow] = useState<boolean>(false);
  const { mutate } = useMutation((data: Record<string, string | number>) => {
    if (!mutateOnBlur) return;
    return mutateOnBlur(data);
  });

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
    if (mutateOnBlur && updateData) {
      const startTime = defaultValue?.split(' ')[1];
      const updateEventDate = formatDate + ' ' + startTime;
      updateData[mutateKey as keyof typeof updateData] = updateEventDate;
      mutate(updateData);
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
    <div className="relative w-full">
      <p className="block py-2 text-md font-semibold text-primary-1100">
        {label}
      </p>
      {disabled ? (
        <div className="relative">
          <div className="absolute top-1/2 left-2 -translate-y-1/2 text-primary-600">
            <Calendar />
          </div>
          <input
            type="text"
            defaultValue={getDefaultDate(defaultValue)}
            disabled={disabled}
            className={`bg-base-light border border-gray-300 font-semibold text-primary-1100 text-xs rounded-lg block w-full h-10.5 pl-10 border-none`}
          />
        </div>
      ) : (
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      )}
    </div>
  );
}

export default InputDate;
