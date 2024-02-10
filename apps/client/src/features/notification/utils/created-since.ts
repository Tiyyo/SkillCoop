export function createdSince(date: string) {
  const creationDateNotificationUTC = new Date(date);
  const localDate = new Date();
  const currentDateUTC = new Date(
    localDate.toLocaleString('en-US', { timeZone: 'Europe/London' }),
  );
  const diff = currentDateUTC.getTime() - creationDateNotificationUTC.getTime();
  const ONE_MINUTE = 60 * 1000;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_WEEK = 7 * ONE_DAY;
  const ONE_MONTH = 30 * ONE_DAY;

  if (diff < ONE_MINUTE) return 'just now';
  if (diff < ONE_HOUR) return `${Math.floor(diff / ONE_MINUTE)} min ago`;
  if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)} h ago`;
  if (diff < 2 * ONE_DAY) return 'yesterday';
  if (diff > 2 * ONE_DAY && diff < ONE_WEEK)
    return `${Math.floor(diff / ONE_DAY)} d ago`;
  if (diff > ONE_WEEK && diff < 2 * ONE_MONTH)
    return `${Math.floor(diff / ONE_WEEK)} w ago`;
  if (diff > 2 * ONE_MONTH) return `${Math.floor(diff / ONE_MONTH)} month ago`;
}
