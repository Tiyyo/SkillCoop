import { useInfiniteQuery } from '@tanstack/react-query';
import { getOrganizeEventFn } from '../../api/authApi';
import { useApp } from '../../store/app.store';
import ReturnBtn from '../../component/return';
import EventList from './EventList';
import { EventType } from '../../types';

function MyEvents() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['OrganizeEvents'],
      queryFn: ({ pageParam = 1 }) => {
        if (!profileId) return;
        return getOrganizeEventFn({ profileId, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          return lastPage.previousPage + 1;
        }
      },
    });
  const loading = isLoading || isFetching;
  const allEvents = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError) return <div>error</div>;
  return (
    <div>
      <ReturnBtn />
      <EventList
        events={allEvents ?? null}
        title="My events"
        loading={loading}
        infiniteScrollOn
        linkOff
        triggerNextPage={fetchNextPage}
      />
    </div>
  );
}

export default MyEvents;
