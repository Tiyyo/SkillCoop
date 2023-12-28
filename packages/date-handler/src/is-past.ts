import { getDateAndTimeUTC } from "./utc";

/**
 * 
 * @param dateToCompare 
 * @returns boolean
    Check if date and time are not passed in UTC timezone
 */
export function isPastDate(dateToCompare: string): boolean {
  const { date: todayDate, time: todayTime } = getDateAndTimeUTC(new Date());
  const { date: dateToCompareDate, time: dateToCompareTime } =
    getDateAndTimeUTC(new Date(dateToCompare));

  if (dateToCompareDate < todayDate) return true;
  if (dateToCompareDate > todayDate) return false;
  if (dateToCompareDate === todayDate) {
    return !(dateToCompareTime > todayTime);
  }
  return true;
}