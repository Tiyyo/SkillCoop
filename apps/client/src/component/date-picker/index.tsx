import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import {
  getDefaultDatePicker,
  todayLocalInputFormat,
} from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';
import { getCurrentLngInLocalStorage } from '../../utils/get-current-lng';

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
  const { t } = useTranslation('event');
  const today = new Date();
  const currentLng = getCurrentLngInLocalStorage();
  const [hasError, setHasError] = useState<boolean | undefined>(error);
  const options = {
    title: t('selectDate'),
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    minDate: new Date(todayLocalInputFormat()),
    theme: {
      background: 'bg-base-light dark:bg-base-light aazeaze',
      todayBtn: `bg-primary-100 hover:bg-primary-500 duration-300 
      hover:text-dark dark:bg-primary-100`,
      clearBtn: `bg-base dark:bg-base dark:text-primary-1100 border 
      dark:border-primary-500 border-primary-500`,
      icons: `bg-base-light dark:bg-base-light dark:text-primary-1100 
      border-primary-400 dark:border-primary-400`,
      text: 'text-primary-1100 dark:text-primary-1100',
      input: `w-full font-semibold text-sm bg-base-light dark:bg-base-light 
      dark:text-primary-1100 text-primary-1100 
      ${high ? 'h-10' : 'h-7'} 
      ${hasError && 'ring-2 ring-error'}`,
      inputIcon: `${hasError ? 'text-error' : 'text-primary-600'}`,
      selected: 'bg-primary-800 dark:bg-primary-800 text-primary-100',
      disabledText: 'text-gray-200 dark:text-gray-200',
    },
    icons: {
      prev: () => (
        <ArrowLeft size={14} className="bg-base-light dark:bg-base-light" />
      ),
      next: () => <ArrowRight size={14} />,
    },
    datepickerClassNames: 'top-12 left-1/2 -translate-x-1/2',
    defaultDate: new Date(defaultValue || today),
    language: currentLng, // To be replaced by current language
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
            defaultValue={getDefaultDatePicker(defaultValue, currentLng)}
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
            classNames="w-full"
          />
        )}
      </div>
    </div>
  );
}

export default InputDate;
