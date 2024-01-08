import { getOrganizeEventFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import EventList from '../resume-events/list';
import type { EventType } from '@skillcoop/types';
import useInfinite from '../../../hooks/useInfinite';
import { useEffect, useId, useState } from 'react';
import ErrorFallback from '../../../component/error-fallback';
import { useTranslation } from 'react-i18next';

function MyEvents() {
  const { t } = useTranslation('title');
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

  // const eventsOrganized = useMemo(() => {
  //   return data?.pages.map((page) => page?.events).flat();
  // }, [loading]);

  useEffect(() => {
    if (data && data.pages) {
      const freshData = data.pages.map((page) => page?.events).flat();
      setOrganizeEvent((prev) => {
        return { ...prev, events: freshData };
      });
    }
  }, [loading]);

  // const allEvents = data?.pages
  //   .map((page) => page?.events)
  //   .flat() as EventType[];

  if (isError) return <ErrorFallback />;

  return (
    <EventList
      key={ID}
      events={organizeEvent.events}
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
