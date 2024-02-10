import { getPastEventFn } from '../../api/api.fn';
import { useApp } from '../../shared/store/app.store';
import EventList from './event-list';
import type { EventType } from '@skillcoop/types/src';
import useInfinite from '../../shared/hooks/useInfinite';
import ErrorFallback from '../../shared/components/error-fallback';
import { useTranslation } from 'react-i18next';

function PastEvents() {
  //TODO : implement skeleton loading
  //TODO : implement error handling
  const { t } = useTranslation('title');
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
      title={t('pastEvents')}
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader={t('pastEventsLegend')}
    />
  );
}

export default PastEvents;
