import { getUpcomingEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import type { EventType } from '@skillcoop/types/src';
import EventList from '../resume-events/list';
import ErrorFallback from '../../../component/error-fallback';
import useInfinite from '../../../hooks/useInfinite';
import { useTranslation } from 'react-i18next';

function IncomingEvents() {
  const { t } = useTranslation('title');
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data, isError, loading, hasNextPage, fetchNextPage } = useInfinite({
    queryKey: 'upcoming-event',
    queryFn: getUpcomingEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  const upcomingEvent = data?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError) return <ErrorFallback />;
  return (
    <EventList
      events={upcomingEvent}
      title={t('upcomingEvents')}
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader={t('upcomingEventsLegend')}
      showcaseNext
    />
  );
}

export default IncomingEvents;
