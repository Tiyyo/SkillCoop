import dateHandler from '../../utils/date.handler';

interface DateLocationProps {
  date: string;
  location: string;
}

function DateAndLocation({ date, location }: DateLocationProps) {
  return (
    <div className="flex text-xs lg:text-sm">
      <p>{dateHandler.getFormatedDate(date)}</p>
      <span className="px-1">-</span>
      <p>{location}</p>
    </div>
  );
}

export default DateAndLocation;
