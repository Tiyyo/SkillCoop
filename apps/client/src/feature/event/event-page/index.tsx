import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DropdownEventMenu from './dropdown-menu/index';
import CallToActionInvitation from './call-to-action-invitation';
import { useApp } from '../../../store/app.store';
import EventPageInfos from './infos';
import TeamComposition from '../team-composition';
import EventPageScore from './score';
import EventPageVotesBanner from './votes';
import { useEffect, useLayoutEffect } from 'react';
import { useEvent } from '../../../store/event.store';
import { useGetSingleEvent } from '../../../hooks/useSingleEvent';
import ParticipantsList from './participants-list';

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
      start_date: event.date,
      duration: event.duration,
      location: event.location,
      required_participants: event.required_participants,
      organizer_id: event.organizer_id,
      start_time: event.date.split(' ')[1],
      participants: event.participants.map((p) => p.profile_id),
      status_name: event.status_name,
      user_status: event.user_status,
    });
    // Clear store on unmount
    return () => {
      initEventState({
        start_date: null,
        start_time: null,
        location: null,
        duration: null,
        required_participants: null,
        organizer_id: null,
        status_name: null,
        participants: null,
        user_status: null,
      });
    };
  }, [location.pathname, event, initEventState]);

  useLayoutEffect(() => {
    if (eventStore && eventStore.user_status === 'declined') {
      navigate('/', { replace: true });
    }
  }, [eventStore.user_status]);
  return (
    <div
      className="flex flex-col lg:gap-y-4 justify-center 
      items-center w-full  self-center"
    >
      <Outlet />
      <div className="flex w-full lg:gap-x-4">
        <div className="flex flex-col w-full lg:gap-y-4">
          <CallToActionInvitation
            eventId={event?.event_id}
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
            <div className="lg:flex lg:gap-6 w-full block">
              <EventPageInfos
                eventDuration={event.duration}
                eventlocation={event?.location}
                eventDate={event?.date}
                requiredParticipants={event?.required_participants}
                profileId={profileId ?? 0}
                eventStatus={event?.status_name}
                isAdmin={eventStore?.organizer_id === profileId}
              />
              <EventPageScore
                eventId={Number(eventId)}
                isAdmin={event.organizer_id === profileId}
                eventDate={event.date}
                scoreTeam1={event.score_team_1}
                scoreTeam2={event.score_team_2}
                eventStatus={event.status_name}
              />
            </div>
          )}
        </div>
        <div className="bg-base-light w-10 h-15 flex flex-col items-center">
          <DropdownEventMenu
            profileId={profileId}
            eventStatus={event?.status_name}
            isAdmin={event?.organizer_id === profileId}
            eventId={Number(eventId)}
          />
        </div>
      </div>
      {event && event.status_name === 'open' && (
        <>
          <ParticipantsList
            confirmedParticipants={event.confirmed_participants}
            requiredparticipants={event.required_participants}
            participants={event.participants}
          />
        </>
      )}
      {event && event.status_name !== 'open' && (
        <TeamComposition
          eventStatus={event.status_name}
          participants={event.participants}
          organizer={event.organizer_id}
          mvp={event.mvp_id}
          bestStriker={event.best_striker_id}
        />
      )}
    </div>
  );
}

export default EventPage;
