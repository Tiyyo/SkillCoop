import EventList from './event-list';
import Spinner from '../../shared/components/loading';
import { useApp } from '../../shared/store/app.store';
import { useResumeEvents } from './hooks/useResumeEvents';
import SubHeader from '../../shared/components/header/sub-header';
import ErrorFallback from '../../shared/components/error-fallback';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

function ResumeEvents() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { events, loading, isError } = useResumeEvents({
    profileId,
  });

  if (isError) return <ErrorFallback />;

  return (
    <Suspense fallback={<div></div>}>
      <SubHeader
        title={t('events')}
        isPlusExist={true}
        linkFromPlus="/new-event"
        textButton={t('addNewEvent')}
        legend={t('eventsLegend')}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-grow flex-col">
          <EventList
            events={events.incoming}
            title={t('upcoming')}
            linkTo="/events/incoming"
            nbEventToDisplay={2}
            noHeader
          />
          <EventList
            events={events.past}
            title={t('past')}
            legendHeader={t('pastLegend')}
            linkTo="/events/past"
            nbEventToDisplay={2}
          />
        </div>
      )}
    </Suspense>
  );
}

export default ResumeEvents;
