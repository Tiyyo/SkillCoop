import { SelectItem } from '@radix-ui/react-select';
import { Select, SelectContent, SelectTrigger } from '../../lib/ui/select';
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

const distanceOptions = {
  5: '5km',
  10: '10km',
  25: '25km',
  50: '50km',
  100: '100km',
  9999: '>100km',
};

type FindEventsFiltersProps = {
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  sortDate: 'asc' | 'desc';
  setSortDate: Dispatch<SetStateAction<'asc' | 'desc'>>;
};

function FindEventsFilters({
  distance,
  setDistance,
  sortDate,
  setSortDate,
}: FindEventsFiltersProps) {
  const { t } = useTranslation('system');
  return (
    <div className="flex gap-3">
      <Select onValueChange={(value) => setDistance(Number(value))}>
        <SelectTrigger className="border-border focus:border-primary-700">
          <p className="text-sm text-xxs md:text-xs">
            {distance === 9999 ? '> 50' : distance}km
          </p>
        </SelectTrigger>
        <SelectContent
          className="w-14 border-border
            bg-base text-xs text-primary-1100 outline-none"
        >
          {Object.entries(distanceOptions).map(([distance, label]) => (
            <SelectItem key={distance} value={distance} className="mx-1 my-2">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value: 'asc' | 'desc') => setSortDate(value)}>
        <SelectTrigger
          className="border-border text-sm text-xxs 
        focus:border-primary-700 md:text-xs"
        >
          {t('event:date')}
          <span className="ml-2">
            {sortDate === 'asc' ? (
              <ArrowUpNarrowWide size={14} />
            ) : (
              <ArrowDownWideNarrow size={14} />
            )}
          </span>
        </SelectTrigger>
        <SelectContent
          className="w-fit
            border-border bg-base text-xs text-primary-1100 outline-none"
        >
          {' '}
          <SelectItem
            value="asc"
            className="my-2 flex items-center justify-between"
          >
            <span className="mx-2 text-xs lg:text-sm">
              {t('upcomingFirst')}
            </span>
            <ArrowUpNarrowWide size={18} />
          </SelectItem>
          <SelectItem
            value="desc"
            className="my-2 flex items-center justify-between"
          >
            <span className="mx-2 text-xs lg:text-sm">{t('furthestAway')}</span>
            <ArrowDownWideNarrow size={18} />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FindEventsFilters;
