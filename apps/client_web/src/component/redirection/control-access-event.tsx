import { Navigate, useParams } from 'react-router-dom';
import { useApp } from '../../store/app.store';
import { useQuery } from '@tanstack/react-query';
import { getEventFn } from '../../api/api.fn';
import { useLayoutEffect, useState } from 'react';

function ControlAccesEventPage({ children }: { children: React.ReactNode }) {
  const { userProfile } = useApp();
  const { eventId } = useParams<{ eventId: string }>();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const { data: event, isLoading } = useQuery(
    [`event${eventId}`],
    () => {
      if (!profileId || !eventId) return;
      return getEventFn(Number(eventId), profileId);
    },
    { enabled: true, refetchOnMount: 'always' }
  );
  const profileId = userProfile?.profile_id;

  //TODO type later just for testing purpose
  function getIdsParticipants(event: any) {
    if (typeof event === 'string') return;
    return event?.participants.map((p: any) => p.profile_id);
  }

  function profileIdIsInIdsParticipants(idsParticipants: any) {
    return idsParticipants?.includes(profileId);
  }

  const idsParticipants = getIdsParticipants(event);

  useLayoutEffect(() => {
    if (isLoading) return;
    profileIdIsInIdsParticipants(idsParticipants)
      ? setIsAuthorized(true)
      : setIsAuthorized(false);
  }, [event]);

  return isAuthorized ? <>{children}</> : <Navigate to="/" />;
}

export default ControlAccesEventPage;
