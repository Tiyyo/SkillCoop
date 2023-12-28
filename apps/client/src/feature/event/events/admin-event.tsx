import { getOrganizeEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import EventList from '../resume-events/list';
import type { EventType } from 'skillcoop-types';
import useInfinite from '../../../hooks/useInfinite';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import ErrorFallback from '../../../component/error-fallback';

function MyEvents() {
  const ID = useId();
  const NB_ELEMETNS_PER_PAGE = 10;
  const [organizeEvent, setOrganizeEvent] = useState<{
    events: EventType[] | null;
  }>({
    events: null,
  });
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'organize-event',
    queryFn: getOrganizeEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });
  console.log(data);

  // const eventsOrganized = useMemo(() => {
  //   return data?.pages.map((page) => page?.events).flat();
  // }, [loading]);

  useEffect(() => {
    console.log('Is component update correctly');
    // setOrganizeEvent();
    if (data && data.pages) {
      const freshData = data.pages.map((page) => page?.events).flat();
      console.log('FreshData ', freshData);
      setOrganizeEvent((prev) => {
        return { ...prev, events: freshData };
      });
      // console.log('Pages :', data.pages.map((page) => page?.events).flat());
      console.log('I update event data');
    }
    console.log('Current State event :', organizeEvent);
  }, [loading]);

  // const allEvents = data?.pages
  //   .map((page) => page?.events)
  //   .flat() as EventType[];

  if (isError) return <ErrorFallback />;

  return (
    <EventList
      key={ID}
      events={organizeEvent.events}
      title="My events"
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader="All events where you have ownership rights"
    />
  );
}

export default MyEvents;
