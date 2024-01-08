import { Navigate, useParams } from 'react-router-dom';
import { useApp } from '../../store/app.store';
import { useQuery } from '@tanstack/react-query';
import { getEventFn } from '../../api/api.fn';
import { useLayoutEffect, useState } from 'react';
import type { EventParticipant, EventType } from '@skillcoop/types';

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
    { enabled: true, refetchOnMount: 'always' },
  );
  const profileId = userProfile?.profile_id;

  function getIdsParticipants(event: EventType | undefined) {
    if (!event) return null;
    if (typeof event.participants === 'string') return null;
    return event?.participants.map((p: EventParticipant) => p.profile_id);
  }

  function profileIdIsInIdsParticipants(idsParticipants: number[]) {
    if (!profileId) return false;
    return idsParticipants?.includes(profileId);
  }

  const idsParticipants = getIdsParticipants(event);

  useLayoutEffect(() => {
    if (isLoading) return;
    if (!idsParticipants) return;
    profileIdIsInIdsParticipants(idsParticipants)
      ? setIsAuthorized(true)
      : setIsAuthorized(false);
  }, [event]);

  return isAuthorized ? <>{children}</> : <Navigate to="/" />;
}

export default ControlAccesEventPage;
