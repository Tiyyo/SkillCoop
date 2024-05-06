"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultDatePicker = exports.getEndingTime = exports.getStartingTime = exports.getDate = void 0;
const guess_timezone_1 = require("./guess-timezone");
function getDate(utcString, lng = 'en') {
    const userTimezone = (0, guess_timezone_1.localTimezone)();
    const dateUtc = new Date(utcString);
    const formatedDate = dateUtc.toLocaleString(`${lng}-US`, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: userTimezone,
    });
    return formatedDate;
}
exports.getDate = getDate;
// Date is an UTCstring from server and should be display in local timezone
function getStartingTime(utcString) {
    const userTimezone = (0, guess_timezone_1.localTimezone)();
    const dateUTC = new Date(utcString);
    const startingHoursAndMin = dateUTC.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: userTimezone,
    });
    return startingHoursAndMin;
}
exports.getStartingTime = getStartingTime;
function getEndingTime(utcString, durationInMin) {
    const userTimezone = (0, guess_timezone_1.localTimezone)();
    const dateUTC = new Date(utcString);
    const SECONDS_IN_MINUTE = 60;
    const MILLISECONDS_IN_SECOND = 1000;
    // convert duration to milliseconds
    const endingDateTimestamp = new Date(dateUTC.getTime() +
        durationInMin * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND);
    const endingHoursAndMin = endingDateTimestamp.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: userTimezone,
    });
    return endingHoursAndMin;
}
exports.getEndingTime = getEndingTime;
function getDefaultDatePicker(date, lng = 'en') {
    if (!date)
        return '';
    try {
        const formatDate = new Intl.DateTimeFormat(`${lng}-US`, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
        return formatDate;
    }
    catch (error) {
        console.log('error', error);
    }
}
exports.getDefaultDatePicker = getDefaultDatePicker;
//# sourceMappingURL=displayed.js.map