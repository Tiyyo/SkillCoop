export function dateCompare(
  a: { date: string },
  b: { date: string },
  sortByDate: 'asc' | 'desc',
) {
  return sortByDate === 'asc'
    ? a.date.localeCompare(b.date)
    : b.date.localeCompare(a.date);
}
