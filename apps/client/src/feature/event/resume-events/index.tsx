import EventList from './list';
import Spinner from '../../../component/loading';
import { useApp } from '../../../store/app.store';
import { useResumeEvents } from '../../../hooks/useResumeEvents';
import SubHeader from '../../../component/header/sub-header';
import ErrorFallback from '../../../component/error-fallback';

function ResumeEvents() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { events, loading, isError } = useResumeEvents({
    profileId,
  });

  if (isError) return <ErrorFallback />;

  return (
    <>
      <SubHeader
        title="Events"
        isPlusExist={true}
        linkFromPlus="/new-event"
        textButton="Add New Event"
        legend="Brief summary of the events you have participated in and your
            upcoming scheduled events"
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <EventList
            events={events.incoming}
            title="Incoming"
            linkTo="/events/incoming"
            nbEventToDisplay={2}
            noHeader
          />
          <EventList
            events={events.past}
            title="Past"
            legendHeader="The two latest events you have participated in"
            linkTo="/events/past"
            nbEventToDisplay={2}
          />
        </>
      )}
    </>
  );
}

export default ResumeEvents;
