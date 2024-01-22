import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/ui/popover';
import { Button } from '../../lib/ui/button';
import { useTranslation } from 'react-i18next';
import { Calendar } from '../../lib/ui/calendar';
import { getDefaultDatePicker } from '@skillcoop/date-handler/src';

function DatePicker({
  onChange,
  currentLng,
  hasError,
}: {
  onChange: (date: Date) => void;
  currentLng?: string;
  hasError?: boolean;
}) {
  const { t } = useTranslation('event');
  const [date, setDate] = useState<Date>();

  console.log('hasError', hasError);

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`flex gap-x-3 items-center justify-start 
          border rouned-lg ${hasError && 'ring-2 ring-error'}`}
        >
          {date ? (
            getDefaultDatePicker(date, currentLng)
          ) : (
            <span className="text-xs font-meidum text-grey-sub-text">
              {t('pickADateForYourEvent')}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
