import { getPastEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import EventList from '../resume-events/list';
import type { EventType } from '@skillcoop/types';
import useInfinite from '../../../hooks/useInfinite';
import ErrorFallback from '../../../component/error-fallback';

function PastEvents() {
  //TODO : implement skeleton loading
  //TODO : implement error handling
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'past-event',
    queryFn: getPastEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  const allEvents = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError) return <ErrorFallback />;
  return (
    <EventList
      events={allEvents ?? null}
      title="Past Events"
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader="Brief summary of the events you have participated in"
    />
  );
}

export default PastEvents;
