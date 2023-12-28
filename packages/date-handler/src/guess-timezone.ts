/**
 * 
 * @returns current timezone where is located an user on browser
 */
export function localTimezone(): string {
  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone
  return timeZone
}