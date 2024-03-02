import EventList from './event-list';
import Spinner from '../../shared/components/loading';
import { useApp } from '../../shared/store/app.store';
import { useResumeEvents } from './hooks/useResumeEvents';
import SubHeader from '../../shared/components/header/sub-header';
import ErrorFallback from '../../shared/components/error-fallback';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

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
      <div
        className="flex justify-between bg-base-light px-6 py-2 lg:my-1.5 
        lg:rounded-lg"
      >
        <div className="flex gap-x-3">
          <div className="w-1.5 min-w-[6px] rounded-full bg-primary-100"></div>
          <h4 className="text-sm text-primary-1100">What's next ?</h4>
        </div>
        <Link to="/events/incoming" className="text-xs text-light">
          {t('system:seeMore')}
        </Link>
      </div>
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
