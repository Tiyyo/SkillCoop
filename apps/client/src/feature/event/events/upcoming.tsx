import { useQuery } from '@tanstack/react-query';
import { getEventsFn, getUpcomingEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import { useEffect, useState } from 'react';
import type { EventType } from 'skillcoop-types';
import EventList from '../resume-events/list';
import ErrorFallback from '../../../component/error-fallback';
import useInfinite from '../../../hooks/useInfinite';

function IncomingEvents() {
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'upcoming-event',
    queryFn: getUpcomingEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  // const userId = userProfile?.user_id;
  // const [events, setEvents] = useState<EventType[]>({} as EventType[]);

  // const {
  //   data: allEvents,
  //   isError,
  //   isLoading,
  //   isFetching,
  // } = useQuery(
  //   ['upcoming-event'],
  //   () => {
  //     if (!userId) return;
  //     return getEventsFn(userId);
  //   },
  //   { enabled: true },
  // );

  // const loading = isLoading || isFetching;

  // useEffect(() => {
  //   if (!allEvents) return;
  //   const past = allEvents
  //     ?.filter((event) => new Date() < new Date(event.date))
  //     .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  //   setEvents(past);
  // }, [allEvents, loading]);
  const upcomingEvent = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  console.log(upcomingEvent);

  if (isError) return <ErrorFallback />;

  return (
    <EventList
      events={upcomingEvent}
      title="Upcoming Events"
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader="Next events scheduled"
      showcaseNext
    />
  );
}

export default IncomingEvents;
