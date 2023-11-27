import EventList from './list';
import Spinner from '../../../component/loading';
import { useApp } from '../../../store/app.store';
import { Link } from 'react-router-dom';
import { useResumeEvents } from '../../../hooks/useResumeEvents';
import SubHeader from '../../../component/header/sub-header';

function ResumeEvents() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { events, loading, isError } = useResumeEvents({
    profileId,
  });
  //  TODO : handle error
  if (isError)
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm text-primary-1100">Something went wrong</p>
        <Link to="/" className="text-xs">
          Go back to home
        </Link>
      </div>
    );

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
            noHeader
          />
          <EventList
            events={events.past}
            title="Past"
            linkTo="/events/past"
            nbEventToDisplay={2}
          />
        </>
      )}
    </>
  );
}

export default ResumeEvents;
