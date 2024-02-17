import { Outlet } from 'react-router-dom';
import DropdownEventMenu from '../dropdown-menu/index';
import CallToActionInvitation from './call-to-action-invitation';
import EventPageInfos from './infos';
import TeamComposition from '../team-composition';
import EventPageScore from './score';
import EventPageVotesBanner from './call-to-action-votes';
import ParticipantsList from './participants-list';
import ChatEventPage from './chat';
import useEventPageManager from '../hooks/useEventPageManager';

function EventPage() {
  const { bodyRef, eventStore, eventId, event, profileId } =
    useEventPageManager();

  return (
    <div
      ref={bodyRef}
      className="flex w-full flex-col 
      items-center justify-center self-center  
      lg:gap-y-4 lg:pt-4"
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
                eventDate={eventStore.date}
                requiredParticipants={eventStore.required_participants}
                profileId={profileId ?? 0}
                eventStatus={eventStore.status_name}
                isAdmin={eventStore?.organizer_id === profileId}
                confirmedParticipants={eventStore.confirmed_participants}
              />
              <EventPageScore
                eventId={Number(eventId)}
                isAdmin={eventStore.organizer_id === profileId}
                eventDate={eventStore.date}
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
            visibility={eventStore.visibility}
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
      <ChatEventPage parentRef={bodyRef} eventId={Number(eventId)} />
    </div>
  );
}

export default EventPage;
