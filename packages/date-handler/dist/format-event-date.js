"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEventDateAndTime = void 0;
function formatEventDateAndTime(date) {
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
exports.formatEventDateAndTime = formatEventDateAndTime;
