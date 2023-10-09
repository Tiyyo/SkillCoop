import { useInfiniteQuery } from '@tanstack/react-query';
import { getPastEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import ReturnBtn from '../../../component/return';
import EventList from '../resume-events/list';
import { EventType } from '../../../types';

function PastEvents() {
  //TODO : implement skeleton loading
  //TODO : implement error handling
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['pastEvents'],
      queryFn: ({ pageParam = 1 }) => {
        if (!profileId) return;
        return getPastEventFn({ profileId, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.eventCount > lastPage.previousPage * 10) {
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
