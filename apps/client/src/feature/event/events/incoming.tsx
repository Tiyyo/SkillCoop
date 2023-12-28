import { useQuery } from '@tanstack/react-query';
import { getEventsFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import { useEffect, useState } from 'react';
import type { EventType } from 'skillcoop-types';
import EventList from '../resume-events/list';
import ErrorFallback from '../../../component/error-fallback';

function IncomingEvents() {
  const { userProfile } = useApp();
  const userId = userProfile?.user_id;
  const [events, setEvents] = useState<EventType[]>({} as EventType[]);
  const {
    data: allEvents,
    isError,
    isLoading,
    isFetching,
  } = useQuery(
    ['upcoming-event'],
    () => {
      if (!userId) return;
      return getEventsFn(userId);
    },
    { enabled: true },
  );

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (!allEvents) return;
    const past = allEvents
      ?.filter((event) => new Date() < new Date(event.date))
      .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    setEvents(past);
  }, [allEvents, loading]);

  if (isError) return <ErrorFallback />;

  return (
    <EventList
      events={events}
      title="Upcoming Events"
      linkOff
      legendHeader="Next events scheduled"
      showcaseNext
    />
  );
}

export default IncomingEvents;
