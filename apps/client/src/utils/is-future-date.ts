// export class PastDateChecker {
//   static isPastDate(dateToCompare: string): boolean {
//     const { date: todayDate, time: todayTime } = this.getDateAndTime(new Date());
//     const { date: dateToCompareDate, time: dateToCompareTime } = this.getDateAndTime(new Date(dateToCompare));
//     if (dateToCompareDate < todayDate) return true;
//     if (dateToCompareDate > todayDate) return false;
//     if (dateToCompareDate === todayDate) {
//       return dateToCompareTime > todayTime ? false : true;
//     }
//     return true
//   }
//   static getFormatedUTCDate(date: Date): string {
//     const formatedUTCDate = new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//       timeZone: 'Europe/London',
//     }).format(date);
//     return formatedUTCDate
//   }
//   static splitFormtedUTCDate(formatedDate: string): { date: string, time: string } {
//     return { date: formatedDate.split(', ')[0], time: formatedDate.split(', ')[1].trim() };
//   }
//   static getDateAndTime(date: Date) {
//     const formatedUTCDate = this.getFormatedUTCDate(date);
//     const { date: formatedDate, time: formatedTime } = this.splitFormtedUTCDate(formatedUTCDate);
//     return { date: formatedDate, time: formatedTime };
//   }
// }