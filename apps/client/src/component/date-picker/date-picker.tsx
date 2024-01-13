import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../lib/ui/popover';
import { Button } from '../../lib/ui/button';
import { CalendarSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '../../lib/ui/calendar';
import { getDefaultDatePicker } from '@skillcoop/date-handler/src';

function DatePicker({
  onChange,
  currentLng,
}: {
  onChange: (date: Date) => void;
  currentLng?: string;
}) {
  const { t } = useTranslation('event');
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex gap-x-3 items-center justify-start 
          border rouned-lg"
        >
          <CalendarSearch
            className="text-primary-700 flex-shrink-0"
            size={24}
          />
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
