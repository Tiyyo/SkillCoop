import { localTimezone } from "./guess-timezone";

export function getDate(utcString: string, lng: string = 'en') {
  const userTimezone = localTimezone()
  const dateUtc = new Date(utcString);
  const formatedDate = dateUtc.toLocaleString(`${lng}-US`, {
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

export function getDefaultDatePicker(date?: Date, lng: string = 'en') {
  if (!date) return '';
  try {
    const formatDate = new Intl.DateTimeFormat(`${lng}-US`, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    return formatDate;
  } catch (error) {
    console.log('error', error);
  }
}