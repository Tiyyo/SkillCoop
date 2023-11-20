import HeaderEventList from './header';
import { EventType } from '../../../../types';
import EventCard from '../card';
import InfiniteScroll from '../../../../component/infinite-scroll';

interface EventListProps {
  title: string;
  events: EventType[] | null;
  nbEventToDisplay?: number;
  linkTo?: string;
  linkOff?: boolean;
  infiniteScrollOn?: boolean;
  loading?: boolean;
  triggerNextPage?: () => void;
  hasMore?: boolean;
}

function EventList({
  title,
  events,
  nbEventToDisplay,
  linkTo,
  linkOff,
  triggerNextPage,
  loading,
  hasMore,
}: EventListProps) {
  const nbEvent: number | undefined = nbEventToDisplay
    ? nbEventToDisplay
    : undefined;

  const isEventsEmpty = events && events.length === 0;

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <HeaderEventList
        title={title}
        linkTo={linkTo}
        linkOff={isEventsEmpty ? true : linkOff}
      />
      {isEventsEmpty && (
        <div className="w-full text-center italic text-xs py-4 text-light">
          No event found.
        </div>
      )}
      <InfiniteScroll
        loading={loading ?? false}
        triggerNextPage={triggerNextPage}
        hasMore={hasMore ?? false}
      >
        {events &&
          events.length > 0 &&
          events.slice(0, nbEvent).map((event) => (
            <EventCard
              key={event.event_id}
              eventId={event.event_id}
              date={event.date}
              location={event.location}
              duration={event.duration}
              // in case backend didn't parse the participants
              participants={
                typeof event.participants === 'string'
                  ? JSON.parse(event.participants)
                  : event.participants
              }
              requiredParticipants={event.required_participants}
              confirmedParticipants={event.confirmed_participants}
              scoreTeamA={event.score_team_1}
              scoreTeamB={event.score_team_2}
              userStatus={event.user_status}
              eventStatus={event.status_name}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default EventList;
