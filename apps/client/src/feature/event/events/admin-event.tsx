import { getOrganizeEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import ReturnBtn from '../../../component/return';
import EventList from '../resume-events/list';
import { EventType } from '../../../types';
import useInfinite from '../../../hooks/useInfinite';
import { Link } from 'react-router-dom';

function MyEvents() {
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'OrganizeEvents',
    queryFn: getOrganizeEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  const allEvents = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm text-primary-1100">Something went wrong</p>
        <Link to="/" className="text-xs">
          Go back to home
        </Link>
      </div>
    );
  return (
    <div>
      <EventList
        events={allEvents ?? null}
        title="My events"
        loading={loading}
        linkOff
        triggerNextPage={fetchNextPage}
        hasMore={hasNextPage}
        legendHeader="Brief summary of the events you have organized"
      />
    </div>
  );
}

export default MyEvents;
