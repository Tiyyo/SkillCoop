import EventList from './list';
import Spinner from '../../../component/loading';
import { useApp } from '../../../store/app.store';
import { useResumeEvents } from '../../../hooks/useResumeEvents';
import SubHeader from '../../../component/header/sub-header';
import ErrorFallback from '../../../component/error-fallback';
import { useTranslation } from 'react-i18next';

function ResumeEvents() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { events, loading, isError } = useResumeEvents({
    profileId,
  });

  if (isError) return <ErrorFallback />;

  return (
    <>
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
        <>
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
        </>
      )}
    </>
  );
}

export default ResumeEvents;
