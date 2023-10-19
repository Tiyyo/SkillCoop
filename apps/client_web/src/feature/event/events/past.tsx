import { getPastEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import ReturnBtn from '../../../component/return';
import EventList from '../resume-events/list';
import { EventType } from '../../../types';
import useInfinite from '../../../hooks/useInfinite';

function PastEvents() {
  //TODO : implement skeleton loading
  //TODO : implement error handling
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'pastEvents',
    queryFn: getPastEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  const allEvents = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError) return <div>error</div>;

  return (
    <div>
      <ReturnBtn />
      <EventList
        events={allEvents ?? null}
        title="Past Events"
        loading={loading}
        linkOff
        triggerNextPage={fetchNextPage}
        hasMore={hasNextPage}
      />
    </div>
  );
}

export default PastEvents;
