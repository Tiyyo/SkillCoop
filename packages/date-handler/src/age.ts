export function getAge(utcstring: string | null) {
  if (!utcstring) return null;
  if (typeof utcstring !== 'string') return null;
  const birthdayUTC = new Date(utcstring);
  const today = new Date();
  const birthdayYearUTC = birthdayUTC.getFullYear();
  const todayYear = today.getUTCFullYear();
  const differenceInYears = todayYear - birthdayYearUTC;
  const birthdayDayAndMonth = birthdayUTC.toLocaleDateString()
  const todayDayAndMonth = today.toLocaleDateString()
  const isBirthdayPassed = birthdayDayAndMonth < todayDayAndMonth;
  const age = isBirthdayPassed ? differenceInYears : differenceInYears - 1;
  if (isNaN(age)) return null;
  return `${age} yo`;
}