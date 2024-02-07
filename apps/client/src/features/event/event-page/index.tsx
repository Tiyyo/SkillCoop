import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DropdownEventMenu from './dropdown-menu/index';
import CallToActionInvitation from './call-to-action-invitation';
import { useApp } from '../../../stores/app.store';
import EventPageInfos from './infos';
import TeamComposition from '../team-composition';
import EventPageScore from './score';
import EventPageVotesBanner from './votes';
import { useEffect, useLayoutEffect } from 'react';
import { useEvent } from '../../../stores/event.store';
import { useGetSingleEvent } from '../../../hooks/useSingleEvent';
import ParticipantsList from './participants-list';
import { getStringDate } from '@skillcoop/date-handler/src';

function EventPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { initEventState, data: eventStore } = useEvent();
  const { userProfile } = useApp();
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
  return (
    <div
      className="flex w-full flex-col items-center justify-center 
      self-center lg:gap-y-4  lg:pt-4"
    >
      <Outlet />
      <div className="flex w-full lg:gap-x-4">
        <div className="flex w-full flex-col lg:gap-y-4">
          <CallToActionInvitation
            eventId={event?.event_id}
            eventStatus={eventStore?.status_name}
            profileId={profileId}
          />
          {event && event.status_name === 'completed' && (
            <EventPageVotesBanner
              eventId={Number(eventId)}
              participants={event.participants}
              profileId={profileId}
            />
          )}
          {event && (
            <div className="block w-full lg:flex lg:gap-6">
              <EventPageInfos
                eventDuration={eventStore.duration}
                eventlocation={eventStore.location}
                eventDate={eventStoreDate ?? event.date}
                requiredParticipants={eventStore.required_participants}
                profileId={profileId ?? 0}
                eventStatus={eventStore.status_name}
                isAdmin={eventStore?.organizer_id === profileId}
                confirmedParticipants={eventStore.confirmed_participants}
              />
              <EventPageScore
                eventId={Number(eventId)}
                isAdmin={eventStore.organizer_id === profileId}
                eventDate={eventStoreDate ?? event.date}
                scoreTeam1={event.score_team_1}
                scoreTeam2={event.score_team_2}
                eventStatus={eventStore.status_name}
              />
            </div>
          )}
        </div>
        <div
          className="h-15 flex w-10 flex-col items-center bg-base-light 
          lg:rounded-lg"
        >
          <DropdownEventMenu
            profileId={profileId}
            eventStatus={eventStore.status_name}
            isAdmin={eventStore.organizer_id === profileId}
            eventId={Number(eventId)}
          />
        </div>
      </div>
      {event && event.status_name === 'open' && (
        <ParticipantsList
          confirmedParticipants={eventStore.confirmed_participants}
          requiredparticipants={eventStore.required_participants}
          participants={eventStore.participants}
        />
      )}
      {event && event.status_name !== 'open' && (
        <TeamComposition
          eventStatus={eventStore.status_name}
          participants={eventStore.participants}
          organizer={eventStore.organizer_id}
          mvp={event.mvp_id}
          bestStriker={event.best_striker_id}
        />
      )}
    </div>
  );
}

export default EventPage;
