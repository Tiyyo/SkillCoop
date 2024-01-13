"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterval = void 0;
/**
 *
 * @param isoStringOne should be an ISO UTC String
 * @param isoStringTwo should be an ISO UTC String
   @returns interval in ms
 */
function getInterval(isoStringOne, isoStringTwo) {
    const dateOne = new Date(isoStringOne).getTime();
    const dateTwo = new Date(isoStringTwo).getTime();
    const interval = Math.abs(dateOne - dateTwo);
    return interval;
}
exports.getInterval = getInterval;
//# sourceMappingURL=interval.js.map