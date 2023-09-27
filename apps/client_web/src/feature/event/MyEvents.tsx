import { useQuery } from '@tanstack/react-query';
import { getOrganizeEventFn } from '../../api/authApi';
import { useApp } from '../../store/app.store';
import ReturnBtn from '../../component/return';
import EventList from './EventList';

function MyEvents() {
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { data: events, isError } = useQuery(
    ['getEvents'],
    () => {
      if (!profileId) return;
      return getOrganizeEventFn(profileId);
    },
    { enabled: true }
  );
  if (isError) return <div>error</div>;
  return (
    <div>
      <ReturnBtn />
      <EventList
        events={events ?? null}
        title="My events"
        linkOff
      />
    </div>
  );
}

export default MyEvents;
