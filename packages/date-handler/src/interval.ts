
/**
 * 
 * @param isoStringOne should be an ISO UTC String
 * @param isoStringTwo should be an ISO UTC String
   @returns interval in ms 
 */
export function getInterval(isoStringOne: string, isoStringTwo: string) {
  const dateOne = new Date(isoStringOne).getTime()
  const dateTwo = new Date(isoStringTwo).getTime()
  const interval = Math.abs(dateOne - dateTwo)
  return interval
}