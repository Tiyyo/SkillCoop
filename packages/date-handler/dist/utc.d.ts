export declare function getStringDate(date: Date): string;
export declare function getLocalStringCustom(date: Date): string;
export declare function getFormattedUTCTimestamp(): string;
export declare function getUTCString(date: Date): string;
/**
 *
 * @param date in local timezone
 * @returns date and time in UTC timezone
 */
export declare function getDateAndTimeUTC(date: Date): {
    date: string;
    time: string;
};
