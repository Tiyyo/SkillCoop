import EventList from './list';
import Spinner from '../../../component/loading';
import { useApp } from '../../../store/app.store';
import { Link } from 'react-router-dom';
import { useResumeEvents } from '../../../hooks/useResumeEvents';

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full flex justify-end px-3">
            <Link
              to="/my-event"
              className="w-fit text-xs px-3 py-1 border border-primary-400
               bg-primary-200 rounded-md my-3 cursor-pointer
                 hover:bg-base duration-300 transition-all
                   hover:border-primary-700"
            >
              My events
            </Link>
          </div>
          <EventList
            events={events.incoming}
            title="Incoming"
            linkTo="/events/incoming"
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
