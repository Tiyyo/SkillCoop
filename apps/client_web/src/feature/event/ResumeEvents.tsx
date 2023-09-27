import { useQuery } from '@tanstack/react-query';
import { EventType } from '../../types';
import EventList from './EventList';
import { getEventsFn } from '../../api/authApi';
import { useEffect, useState } from 'react';
import Spinner from '../../component/loading';
import { useApp } from '../../store/app.store';
import { Link } from 'react-router-dom';
import ArrowRight from '../../assets/icon/ArrowRight';

function ResumeEvents() {
  const { userProfile } = useApp();
  const userId = userProfile?.user_id;

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
  } = useQuery(
    ['getEvents'],
    () => {
      if (!userId) return;
      return getEventsFn(userId);
    },
    { enabled: true }
  );
  const loading = isLoading || isFetching;
  const today = new Date();

  useEffect(() => {
    if (!allEvents) return;
    setEvents((prev) => {
      return {
        ...prev,
        incoming: allEvents?.filter((event) => today < new Date(event.date)),
        past: allEvents?.filter((event) => today > new Date(event.date)),
      };
    });
  }, [allEvents, loading]);

  //  TODO : handle error
  if (isError) return <div>error</div>;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Link
            to="/my-event"
            className="flex justify-end text-xs cursor-pointer text-end py-2 px-3 gap-2 text-accent-700 underline-offset-4 underline">
            My events
            <ArrowRight />
          </Link>
          <EventList
            events={events.incoming}
            title="Incoming"
            linkTo="/events/incoming"
          />
          <EventList
            events={events.past}
            title="Past"
            linkTo="/events/past"
            nbEventToDisplay={2}
          />
        </>
      )}
    </>
  );
}

export default ResumeEvents;
