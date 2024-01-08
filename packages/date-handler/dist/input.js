"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todayLocalInputFormat = void 0;
/**
 *
 * @returns Formated date in local timezone for HTML Input
 */
function todayLocalInputFormat() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayFormated = `${year}-${month < 10 ? '0' + month : month}-${day}`;
    return todayFormated;
}
exports.todayLocalInputFormat = todayLocalInputFormat;
//# sourceMappingURL=input.js.map