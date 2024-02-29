import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';

export function addCreatedISOStringDate<T>(data: T) {
  const todayUTCString = getFormattedUTCTimestamp();
  return { ...data, created_at: todayUTCString };
}

export function addUpdatedISOStringDate<T>(data: T) {
  const todayUTCString = getFormattedUTCTimestamp();
  return { ...data, updated_at: todayUTCString };
}
