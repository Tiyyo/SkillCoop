export function getStringDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  const millisecond = date.getUTCMilliseconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

export function getLocalStringCustom(date: Date) {
  // console.log('date received from db', date)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

export function getFormattedUTCTimestamp(): string {
  const today = new Date()
  const UTCString = today.toISOString()
  return UTCString
}

export function getUTCString(date: Date) {
  const UTCString = date.toISOString()
  return UTCString
}


/**
 * 
 * @param date in local timezone
 * @returns date and time in UTC timezone
 */
export function getDateAndTimeUTC(date: Date) {
  const formatedUTCDate = getFormatedUTCDate(date);
  const { date: formatedDate, time: formatedTime } = splitFormtedUTCDate(formatedUTCDate);
  return { date: formatedDate, time: formatedTime };
}


function splitFormtedUTCDate(formatedDate: string): { date: string, time: string } {
  return { date: formatedDate.split(', ')[0], time: formatedDate.split(', ')[1].trim() };
}

function getFormatedUTCDate(date: Date): string {
  const formatedUTCDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Europe/London',
  }).format(date);
  return formatedUTCDate
}