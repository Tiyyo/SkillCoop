// export default {
// getFormatedDate(date: string) {
//   const eventDate = new Date(date);
//   const formatedDate = eventDate.toLocaleString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     timeZone: 'Europe/Paris',
//   });
//   return formatedDate;
// },
// getStartingTime(date: string) {
//   const eventDate = new Date(date);
//   const startingHoursAndMin = eventDate.toLocaleString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     timeZone: 'Europe/Paris',
//   });
//   return startingHoursAndMin;
// },
// getEndingTime(date: string, durationInMin: number) {
//   const eventDate = new Date(date);
//   const SECONDS_IN_MINUTE = 60;
//   const MILLISECONDS_IN_SECOND = 1000;
//   // convert duration to milliseconds
//   const endingDateTimestamp = new Date(
//     eventDate.getTime() +
//     durationInMin * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
//   );
//   const endingHoursAndMin = endingDateTimestamp.toLocaleString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     timeZone: 'Europe/Paris',
//   });
//   return endingHoursAndMin;
// },
// getTodayFormatedForInput() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth() + 1;
//   const day = today.getDate();
//   const todayFormated = `${year}-${month < 10 ? '0' + month : month}-${day}`;
//   return todayFormated;
// },
// dateShouldBeInTheFuture(date: string) {
//   const today = new Date();
//   const dateToCompare = new Date(date);
//   return dateToCompare > today;
// },
// getAgeFromDate(date: string | null) {
//   if (!date) return null;
//   if (typeof date !== 'string') return null;
//   const birthday = new Date(date);
//   const today = new Date();
//   const birthdayYear = birthday.getFullYear();
//   const todayYear = today.getFullYear();
//   const differenceInYears = todayYear - birthdayYear;
//   const birthdayDayAndMonth = birthday.toLocaleDateString()
//   const todayDayAndMonth = today.toLocaleDateString()
//   const isBirthdayPassed = birthdayDayAndMonth < todayDayAndMonth;
//   const age = isBirthdayPassed ? differenceInYears : differenceInYears - 1;
//   if (isNaN(age)) return null;
//   return `${age} yo`;
// },
// };
