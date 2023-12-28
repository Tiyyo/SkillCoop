export function formatEventDateAndTime(date: string): string {
  // date should be in UTC
  // and should be converted to user TZ
  const constructDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-Us', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(constructDate);
  const formatedTime = new Intl.DateTimeFormat('en-Us', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(constructDate);
  const formatedEventDate = `${formattedDate} at ${formatedTime}`;
  return formatedEventDate;
}


