import { useState } from 'react';

export default function useFindEventsFilters() {
  const [distance, setDistance] = useState<number>(50);
  /*eslint-disable-next-line*/
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('asc'); // asc or desc

  return { distance, setDistance, sortByDate, setSortByDate };
}
