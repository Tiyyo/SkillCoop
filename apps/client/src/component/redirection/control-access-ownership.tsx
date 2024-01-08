import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { useApp } from '../../store/app.store';
import { getEventFn } from '../../api/api.fn';
import Spinner from '../loading';
import TransfertOwnership from '../../feature/event/event-page/ownership';
import { Suspense } from 'react';

function ControlAccessOwnership() {
  const { eventId } = useParams();
  const { userProfile } = useApp();
  // Make an API call to get the event data
  // If data has been cached with react query useQuery hook, use it

  const {
    data: event,
    isLoading,
    isFetching,
  } = useQuery([`event${eventId}`], () => {
    if (!userProfile?.profile_id || !eventId) return;
    return getEventFn(Number(eventId), userProfile?.profile_id);
  });
  const loading = isLoading || isFetching;

  if (loading) return <Spinner />;
  if (!userProfile) return;

  return userProfile?.profile_id !== event?.organizer_id ? (
    <Navigate to={`/event/${eventId}`} />
  ) : (
    <Suspense fallback="coucou">
      <TransfertOwnership data={event} profileId={userProfile.profile_id} />
    </Suspense>
  );
}

export default ControlAccessOwnership;
