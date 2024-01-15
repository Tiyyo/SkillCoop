"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAge = void 0;
function getAge(utcstring) {
    if (!utcstring)
        return null;
    if (typeof utcstring !== 'string')
        return null;
    const birthdayUTC = new Date(utcstring);
    const today = new Date();
    const birthdayYearUTC = birthdayUTC.getFullYear();
    const todayYear = today.getUTCFullYear();
    const differenceInYears = todayYear - birthdayYearUTC;
    const birthdayMonth = birthdayUTC.getMonth();
    const todayMonth = today.getMonth();
    const birthdayDay = birthdayUTC.getDate();
    const todayDay = today.getDate();
    let age = differenceInYears;
    if (todayMonth < birthdayMonth || (todayMonth === birthdayMonth && todayDay < birthdayDay)) {
        age--;
    }
    if (isNaN(age))
        return null;
    return age;
}
exports.getAge = getAge;
//# sourceMappingURL=age.js.map