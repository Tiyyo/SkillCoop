/**
 * 
 * @returns Formated date in local timezone for HTML Input
 */
export function todayLocalInputFormat() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const todayFormated = `${year}-${month < 10 ? '0' + month : month}-${day}`;
  return todayFormated;
}
