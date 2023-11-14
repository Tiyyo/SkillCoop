import { useQuery } from '@tanstack/react-query';
import { EventType } from '../../../types';
import EventList from './list';
import { getEventsFn } from '../../../api/api.fn';
import { useEffect, useState } from 'react';
import Spinner from '../../../component/loading';
import { useApp } from '../../../store/app.store';
import { Link } from 'react-router-dom';

function ResumeEvents() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;

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
    [`events/profile`],
    //@ts-ignore
    () => {
      if (!profileId) return { data: null };
      return getEventsFn(profileId);
    },
    { enabled: true },
  );

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

  //  TODO : handle error
  if (isError) return <div>error</div>;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full flex justify-end px-3">
            <Link
              to="/my-event"
              className="w-fit text-xs px-3 py-1 border border-primary-400 bg-primary-200 rounded-md my-3 cursor-pointer hover:bg-base duration-300 transition-all hover:border-primary-700"
            >
              My events
            </Link>
          </div>
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
