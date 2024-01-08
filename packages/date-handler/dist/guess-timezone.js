"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localTimezone = void 0;
/**
 *
 * @returns current timezone where is located an user on browser
 */
function localTimezone() {
    const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
}
exports.localTimezone = localTimezone;
//# sourceMappingURL=guess-timezone.js.map