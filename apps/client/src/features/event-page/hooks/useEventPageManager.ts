import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../../shared/store/app.store';
import { useEvent } from '../store/event.store';
import { useGetSingleEvent } from '../../../shared/hooks/useSingleEvent';
import { getStringDate } from '@skillcoop/date-handler/src';

export default function useEventPageManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { initEventState, data: eventStore } = useEvent();
  const { userProfile } = useApp();
  const bodyRef = useRef<HTMLDivElement>(null);
  const profileId = userProfile?.profile_id;

  const { data: event } = useGetSingleEvent({
    eventId: Number(eventId),
    profileId: profileId,
  });

  useEffect(() => {
    if (!event) return;
    if (typeof event.participants === 'string') return;
    initEventState({
      start_date: getStringDate(new Date(event.date)).split(' ')[0],
      duration: event.duration,
      location: event.location,
      required_participants: event.required_participants,
      organizer_id: event.organizer_id,
      start_time: getStringDate(new Date(event.date)).split(' ')[1],
      participants: event.participants,
      status_name: event.status_name,
      user_status: event.user_status,
      confirmed_participants: event.participants.filter(
        (p) => p.status === 'confirmed',
      ).length,
    });
  }, [location.pathname, event, initEventState]);

  const eventStoreDate =
    eventStore.start_date &&
    eventStore.start_time &&
    new Date(
      `${eventStore?.start_date} ${eventStore.start_time}Z`,
    ).toISOString();

  useLayoutEffect(() => {
    if (eventStore && eventStore.user_status === 'declined') {
      navigate('/', { replace: true });
    }
  }, [eventStore.user_status]);

  return { bodyRef, eventStoreDate, event, eventStore, eventId, profileId };
}
