import { useEffect, useState } from 'react';
import { useGetAllEvents } from './useMultipleEvents';
import type { EventType } from '@skillcoop/types/src';

export function useResumeEvents({ profileId }: { profileId?: number }) {
  const [events, setEvents] = useState<{
    incoming: EventType[] | null;
    past: EventType[] | null;
  }>({
    incoming: null,
    past: null,
  });

  const {
    data: allEvents,
    isError,
    isLoading,
    isFetching,
  } = useGetAllEvents({ profileId });

  const loading = isLoading || isFetching;
  const today = new Date();

  useEffect(() => {
    if (!allEvents) return;
    setEvents((prev) => {
      return {
        ...prev,
        incoming: allEvents
          ?.filter((event) => today < new Date(event.date))
          .sort(
            (eventA, eventB) =>
              Number(new Date(eventA.date).getTime()) -
              Number(new Date(eventB.date).getTime()),
          ),
        past: allEvents?.filter((event) => today > new Date(event.date)),
      };
    });
  }, [allEvents, loading]);
  return { events, loading, isError };
}
