"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateAndTimeUTC = exports.getUTCString = exports.getFormattedUTCTimestamp = exports.getLocalStringCustom = exports.getStringDate = void 0;
function getStringDate(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();
    const millisecond = date.getUTCMilliseconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}
exports.getStringDate = getStringDate;
function getLocalStringCustom(date) {
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
exports.getLocalStringCustom = getLocalStringCustom;
function getFormattedUTCTimestamp() {
    const today = new Date();
    const UTCString = today.toISOString();
    return UTCString;
}
exports.getFormattedUTCTimestamp = getFormattedUTCTimestamp;
function getUTCString(date) {
    const UTCString = date.toISOString();
    return UTCString;
}
exports.getUTCString = getUTCString;
/**
 *
 * @param date in local timezone
 * @returns date and time in UTC timezone
 */
function getDateAndTimeUTC(date) {
    const formatedUTCDate = getFormatedUTCDate(date);
    const { date: formatedDate, time: formatedTime } = splitFormtedUTCDate(formatedUTCDate);
    return { date: formatedDate, time: formatedTime };
}
exports.getDateAndTimeUTC = getDateAndTimeUTC;
function splitFormtedUTCDate(formatedDate) {
    return { date: formatedDate.split(', ')[0], time: formatedDate.split(', ')[1].trim() };
}
function getFormatedUTCDate(date) {
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
    return formatedUTCDate;
}
//# sourceMappingURL=utc.js.map