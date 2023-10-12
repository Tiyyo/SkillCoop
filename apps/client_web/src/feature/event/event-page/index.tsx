import { useQuery } from '@tanstack/react-query';
import { getEventFn } from '../../../api/api.fn';
import { Link, useLocation } from 'react-router-dom';
import ReturnBtn from '../../../component/return';
import DropdownEventMenu from './dropdown-menu';
import CallToActionInvitation from './call-to-action-invitation';
import { useApp } from '../../../store/app.store';
import EventPageInfos from './infos';
import Participant from '../../../component/participant';
import Plus from '../../../assets/icon/Plus';
import TeamComposition from '../TeamComposition';
import EventPageScore from './score';
import EventPageVotesBanner from './votes';

function EventPage() {
  const {
    state: { eventId },
  } = useLocation();
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;

  const { data: event } = useQuery(
    ['event'],
    () => {
      if (!profileId) return;
      return getEventFn(eventId, profileId);
    },
    { enabled: true }
  );

  return (
    <div>
      <div className="flex justify-between items-start py-2 bg-base-light mx-2 my-4 rounded-md shadow">
        <ReturnBtn />
        <CallToActionInvitation
          userStatus={event?.user_status}
          eventId={event?.event_id}
          profileId={profileId}
        />
        <DropdownEventMenu
          profileId={profileId}
          isAdmin={event?.organizer_id === profileId}
          eventId={eventId}
        />
      </div>
      {event && event.status_name === 'completed' && (
        <EventPageVotesBanner
          eventId={eventId}
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
            isAdmin={event?.organizer_id === profileId}
          />
          <EventPageScore
            eventId={eventId}
            isAdmin={event.organizer_id === profileId}
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
                  profileId={participant.profile_id}
                  key={participant.profile_id}
                  {...participant}
                />
              ))}
          </ul>
        </div>
      )}
      {event && event.status_name !== 'open' && (
        <TeamComposition
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
          className="flex items-center underline underline-offset-8 un gap-2 py-4 text-md text-primary-1100 font-semibold cursor-pointer w-full justify-center">
          <p>INVITE FRIENDS </p>
          <Plus />
        </Link>
      )}
    </div>
  );
}

export default EventPage;
