export const displayOneDigitWith2Digit = (number: number) => {

  return number < 10 ? `0${number}` : `${number}`;
};
