import { getOrganizeEventFn } from '../../../api/api.fn';
import { useApp } from '../../../stores/app.store';
import EventList from '../resume-events/list';
import type { EventType } from '@skillcoop/types/src';
import useInfinite from '../../../hooks/useInfinite';
import { useId } from 'react';
import ErrorFallback from '../../../components/error-fallback';
import { useTranslation } from 'react-i18next';

function MyEvents() {
  const { t } = useTranslation('title');
  const ID = useId();
  const NB_ELEMETNS_PER_PAGE = 10;
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const {
    data: event,
    isError,
    loading,
    hasNextPage,
    fetchNextPage,
  } = useInfinite({
    queryKey: 'organize-event',
    queryFn: getOrganizeEventFn,
    elementPerPage: NB_ELEMETNS_PER_PAGE,
    argsFn: { profileId },
  });

  const organizeEvent = event?.pages
    .map((page) => page?.events)
    .flat() as EventType[];

  if (isError) return <ErrorFallback />;
  return (
    <EventList
      key={ID}
      events={organizeEvent}
      title={t('myEvents')}
      loading={loading}
      linkOff
      triggerNextPage={fetchNextPage}
      hasMore={hasNextPage}
      legendHeader={t('myEventsLegend')}
    />
  );
}

export default MyEvents;
