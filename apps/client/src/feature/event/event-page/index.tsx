import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import ReturnBtn from '../../../component/return';
import DropdownEventMenu from './dropdown-menu/index';
import CallToActionInvitation from './call-to-action-invitation';
import { useApp } from '../../../store/app.store';
import EventPageInfos from './infos';
import Participant from '../../../component/participant';
import Plus from '../../../assets/icon/Plus';
import TeamComposition from '../team-composition';
import EventPageScore from './score';
import EventPageVotesBanner from './votes';
import { useEffect, useLayoutEffect } from 'react';
import { useEvent } from '../../../store/event.store';
import { useGetSingleEvent } from '../../../hooks/useSingleEvent';

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
    <div>
      <Outlet />
      <div
        className="flex justify-between items-start py-2
       bg-base-light mx-2 my-4 rounded-md shadow"
      >
        <ReturnBtn />
        <CallToActionInvitation
          eventId={event?.event_id}
          profileId={profileId}
        />
        <DropdownEventMenu
          profileId={profileId}
          eventStatus={event?.status_name}
          isAdmin={event?.organizer_id === profileId}
          eventId={Number(eventId)}
        />
      </div>
      {event && event.status_name === 'completed' && (
        <EventPageVotesBanner
          eventId={Number(eventId)}
          participants={event.participants}
          profileId={profileId}
        />
      )}
      {event && (
        <>
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
        </>
      )}
      {event && event.status_name === 'open' && (
        <div className=" bg-base-light mx-2 my-4 rounded-md shadow py-4 px-3">
          <h2 className="text-sm font-semibold flex items-center py-1.5">
            Participants{' '}
            <p className="text-xs ml-2 text-light font-normal">
              <span>{event.confirmed_participants}</span> /{' '}
              <span>{event.required_participants}</span> are confirmed
            </p>
          </h2>
          <ul className="grid grid-cols-particpant-layout gap-2">
            {/* particpants can be a string if backend failed to parsed data */}
            {typeof event.participants !== 'string' &&
              event.participants.map((participant) => (
                <Participant
                  isAdmin={eventStore?.organizer_id === participant.profile_id}
                  profileId={participant.profile_id}
                  eventStatus={event.status_name}
                  key={participant.profile_id}
                  {...participant}
                />
              ))}
          </ul>
        </div>
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
      {event && event.status_name !== 'completed' && (
        <Link
          to="invitation"
          state={{ eventId, variant: 'mutate' }}
          className="flex items-center underline underline-offset-8 un gap-2 py-4
           text-md text-primary-1100 font-semibold cursor-pointer w-full justify-center"
        >
          <p>INVITE FRIENDS </p>
          <Plus />
        </Link>
      )}
    </div>
  );
}

export default EventPage;
