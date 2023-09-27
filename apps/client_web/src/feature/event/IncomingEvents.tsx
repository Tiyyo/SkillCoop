import { useQuery } from '@tanstack/react-query';
import { getEventsFn } from '../../api/authApi';
import { useApp } from '../../store/app.store';
import { useEffect, useState } from 'react';
import { EventType } from '../../types';
import ReturnBtn from '../../component/return';
import EventList from './EventList';

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
    { enabled: true }
  );

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (!allEvents) return;
    const past = allEvents?.filter(
      (event) => new Date() < new Date(event.date)
    );
    setEvents(past);
  }, [allEvents, loading]);
  if (isError) return <div>error</div>;

  return (
    <div>
      <ReturnBtn />
      <EventList
        events={events}
        title="Incoming Events"
        linkOff
      />
    </div>
  );
}

export default IncomingEvents;
