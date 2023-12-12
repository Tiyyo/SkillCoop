import { useQuery } from '@tanstack/react-query';
import { getEventsFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import { useEffect, useState } from 'react';
import { EventType } from '../../../types';
import EventList from '../resume-events/list';
import { Link } from 'react-router-dom';

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
    ['getEvents'],
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

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <p className="text-sm text-primary-1100">Something went wrong</p>
        <Link to="/" className="text-xs">
          Go back to home
        </Link>
      </div>
    );

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
