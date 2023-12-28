import { localTimezone } from "./guess-timezone";
import { getStringDate } from "./utc";

export function getDate(utcString: string) {
  const userTimezone = localTimezone()
  const dateUtc = new Date(utcString);
  const formatedDate = dateUtc.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: userTimezone,
  });
  return formatedDate;
}
// Date is an UTCstring from server and should be display in local timezone
export function getStartingTime(utcString: string) {
  const userTimezone = localTimezone()
  const dateUTC = new Date(utcString)

  const startingHoursAndMin = dateUTC.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: userTimezone,
  });
  return startingHoursAndMin;
}

export function getEndingTime(utcString: string, durationInMin: number) {
  const userTimezone = localTimezone()
  const dateUTC = new Date(utcString);
  const SECONDS_IN_MINUTE = 60;
  const MILLISECONDS_IN_SECOND = 1000;
  // convert duration to milliseconds
  const endingDateTimestamp = new Date(
    dateUTC.getTime() +
    durationInMin * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
  );

  const endingHoursAndMin = endingDateTimestamp.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: userTimezone,
  });
  return endingHoursAndMin;
}

export function getDefaultDatePicker(date?: string) {
  if (!date) return '';
  const usuableDate = new Date(getStringDate(new Date(date)));
  const formatDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(usuableDate);
  return formatDate;
}