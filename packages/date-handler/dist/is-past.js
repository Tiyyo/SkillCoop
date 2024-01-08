"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPastDate = void 0;
const utc_1 = require("./utc");
/**
 *
 * @param dateToCompare
 * @returns boolean
    Check if date and time are not passed in UTC timezone
 */
function isPastDate(dateToCompare) {
    const { date: todayDate, time: todayTime } = (0, utc_1.getDateAndTimeUTC)(new Date());
    const { date: dateToCompareDate, time: dateToCompareTime } = (0, utc_1.getDateAndTimeUTC)(new Date(dateToCompare));
    if (dateToCompareDate < todayDate)
        return true;
    if (dateToCompareDate > todayDate)
        return false;
    if (dateToCompareDate === todayDate) {
        return !(dateToCompareTime > todayTime);
    }
    return true;
}
exports.isPastDate = isPastDate;
//# sourceMappingURL=is-past.js.map