import { CalendarSearch } from 'lucide-react';
import { getDefaultDatePicker } from '@skillcoop/date-handler/src';
import { getCurrentLngInLocalStorage } from '../../utils/get-current-lng';
import DatePicker from './date-picker';
import useResetError from '../../hooks/useResetError';

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
}: InputDateProps) {
  const currentLng = getCurrentLngInLocalStorage();
  const { hasError, setHasError } = useResetError(error);
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
  const defaultDate =
    typeof defaultValue === 'string' ? new Date(defaultValue) : undefined;

  return (
    <div className="relative w-full flex gap-x-2.5 items-center py-4">
      <CalendarSearch
        className={`${
          hasError ? 'text-error' : 'text-primary-100'
        } flex-shrink-0 basis-7`}
        size={24}
      />
      <div className="flex flex-col gap-y-1 flex-grow">
        <div className="block h-4 ml-2 text-xs font-medium text-grey-sub-text">
          {label}
        </div>
        {disabled ? (
          <input
            type="text"
            defaultValue={getDefaultDatePicker(defaultDate, currentLng)}
            disabled={disabled}
            className={`bg-base-light border border-gray-300 
            font-semibold text-primary-1100 text-xs rounded-lg block w-full 
            h-7 pl-2 border-none`}
          />
        ) : (
          <>
            <DatePicker
              onChange={handleChange}
              currentLng={currentLng}
              hasError={hasError}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default InputDate;